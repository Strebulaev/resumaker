import { Injectable } from '@angular/core';
import { SupabaseService } from '../db/supabase.service';
import {
  CloudFile,
  UploadRequest,
  UploadResult,
  StorageQuota,
  ShareLink,
  Folder,
  SyncStatus,
  BackupConfig,
  FileOperation,
  FileCategory,
  FileOperationType,
  OperationStatus
} from './cloud-storage.models';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CloudStorageService {
  private quotaSubject = new BehaviorSubject<StorageQuota | null>(null);
  public quota$ = this.quotaSubject.asObservable();

  constructor(private supabaseService: SupabaseService) {}

  async uploadFile(request: UploadRequest): Promise<UploadResult> {
    try {
      const user = this.supabaseService.currentUser;
      if (!user) throw new Error('User not authenticated');

      const quota = await this.getStorageQuota(user.id);
      if (quota.used + request.file.size > quota.limit) {
        throw new Error('Storage quota exceeded');
      }

      const fileId = this.generateId();
      const fileName = `${fileId}_${request.file.name}`;
      const filePath = `users/${user.id}/${request.category}/${fileName}`;

      const { data, error } = await this.supabaseService.client.storage
        .from('user-files')
        .upload(filePath, request.file);

      if (error) throw error;

      const { data: urlData } = this.supabaseService.client.storage
        .from('user-files')
        .getPublicUrl(filePath);

      const cloudFile: Partial<CloudFile> = {
        id: fileId,
        userId: user.id,
        name: request.file.name,
        originalName: request.file.name,
        mimeType: request.file.type,
        size: request.file.size,
        url: urlData.publicUrl,
        category: request.category,
        tags: request.tags || [],
        metadata: {
          checksum: await this.calculateChecksum(request.file),
          ...request.metadata
        },
        permissions: {
          public: false,
          allowedUsers: [],
          allowedDomains: [],
          downloadsCount: 0,
          ...request.permissions
        },
        version: 1,
        versions: [{
          version: 1,
          url: urlData.publicUrl,
          size: request.file.size,
          createdAt: new Date(),
          createdBy: user.id
        }],
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const { data: savedFile, error: saveError } = await this.supabaseService.client
        .from('cloud_files')
        .insert(cloudFile)
        .select()
        .single();

      if (saveError) throw saveError;

      await this.updateStorageQuota(user.id);

      return {
        success: true,
        file: savedFile
      };

    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Upload failed'
      };
    }
  }

  async downloadFile(fileId: string): Promise<Blob> {
    const user = this.supabaseService.currentUser;
    if (!user) throw new Error('User not authenticated');

    const file = await this.getFile(fileId);
    if (!file) throw new Error('File not found');

    if (!this.canAccessFile(file, user.id)) {
      throw new Error('Access denied');
    }

    const response = await fetch(file.url);
    if (!response.ok) throw new Error('Download failed');

    await this.incrementDownloadCount(fileId);

    return response.blob();
  }

  async deleteFile(fileId: string): Promise<void> {
    const user = this.supabaseService.currentUser;
    if (!user) throw new Error('User not authenticated');

    const file = await this.getFile(fileId);
    if (!file || file.userId !== user.id) {
      throw new Error('File not found or access denied');
    }

    const filePath = this.getFilePath(file);

    await this.supabaseService.client.storage
      .from('user-files')
      .remove([filePath]);

    await this.supabaseService.client
      .from('cloud_files')
      .delete()
      .eq('id', fileId);

    await this.updateStorageQuota(user.id);
  }

  async getUserFiles(category?: FileCategory): Promise<CloudFile[]> {
    const user = this.supabaseService.currentUser;
    if (!user) throw new Error('User not authenticated');

    let query = this.supabaseService.client
      .from('cloud_files')
      .select('*')
      .eq('user_id', user.id);

    if (category) {
      query = query.eq('category', category);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getFile(fileId: string): Promise<CloudFile | null> {
    const { data, error } = await this.supabaseService.client
      .from('cloud_files')
      .select('*')
      .eq('id', fileId)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data || null;
  }

  async createShareLink(fileId: string, options: {
    expiresAt?: Date;
    password?: string;
    downloadLimit?: number;
  } = {}): Promise<ShareLink> {
    const user = this.supabaseService.currentUser;
    if (!user) throw new Error('User not authenticated');

    const file = await this.getFile(fileId);
    if (!file || file.userId !== user.id) {
      throw new Error('File not found or access denied');
    }

    const token = this.generateToken();
    const shareLink: Partial<ShareLink> = {
      fileId,
      token,
      url: `${window.location.origin}/shared/${token}`,
      expiresAt: options.expiresAt,
      password: options.password,
      downloadLimit: options.downloadLimit,
      downloadsCount: 0,
      createdAt: new Date(),
      createdBy: user.id
    };

    const { data, error } = await this.supabaseService.client
      .from('share_links')
      .insert(shareLink)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getSharedFile(token: string, password?: string): Promise<CloudFile | null> {
    const { data: link, error: linkError } = await this.supabaseService.client
      .from('share_links')
      .select('*, cloud_files(*)')
      .eq('token', token)
      .single();

    if (linkError || !link) return null;

    if (link.expires_at && new Date() > new Date(link.expires_at)) {
      throw new Error('Link expired');
    }

    if (link.password && link.password !== password) {
      throw new Error('Invalid password');
    }

    if (link.download_limit && link.downloads_count >= link.download_limit) {
      throw new Error('Download limit exceeded');
    }

    return link.cloud_files;
  }

  async getStorageQuota(userId: string): Promise<StorageQuota> {
    const { data, error } = await this.supabaseService.client
      .from('storage_quotas')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error && error.code !== 'PGRST116') throw error;

    if (!data) {
      const defaultQuota: Partial<StorageQuota> = {
        used: 0,
        limit: 1024 * 1024 * 1024, // 1GB
        filesCount: 0,
        filesLimit: 1000,
        bandwidthUsed: 0,
        bandwidthLimit: 1024 * 1024 * 1024 * 10 // 10GB
      };

      const { data: createdQuota, error: createError } = await this.supabaseService.client
        .from('storage_quotas')
        .insert({ user_id: userId, ...defaultQuota })
        .select()
        .single();

      if (createError) throw createError;
      return createdQuota;
    }

    this.quotaSubject.next(data);
    return data;
  }

  async updateStorageQuota(userId: string): Promise<void> {
    const files = await this.getUserFiles();
    const totalSize = files.reduce((sum, file) => sum + file.size, 0);

    await this.supabaseService.client
      .from('storage_quotas')
      .update({
        used: totalSize,
        files_count: files.length,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', userId);

    const quota = await this.getStorageQuota(userId);
    this.quotaSubject.next(quota);
  }

  async createFolder(name: string, parentId?: string): Promise<Folder> {
    const user = this.supabaseService.currentUser;
    if (!user) throw new Error('User not authenticated');

    const path = parentId ? `${await this.getFolderPath(parentId)}/${name}` : name;

    const folder: Partial<Folder> = {
      userId: user.id,
      name,
      parentId,
      path,
      filesCount: 0,
      totalSize: 0,
      permissions: {
        public: false,
        allowedUsers: [],
        inheritParent: true
      },
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const { data, error } = await this.supabaseService.client
      .from('folders')
      .insert(folder)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getUserFolders(): Promise<Folder[]> {
    const user = this.supabaseService.currentUser;
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await this.supabaseService.client
      .from('folders')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async backupData(config: BackupConfig): Promise<void> {
    const user = this.supabaseService.currentUser;
    if (!user) throw new Error('User not authenticated');

    const files = await this.getUserFiles();
    const profiles = await this.supabaseService.getFullProfile();

    const backupData = {
      files,
      profiles,
      exportedAt: new Date(),
      version: '1.0'
    };

    const blob = new Blob([JSON.stringify(backupData, null, 2)], {
      type: 'application/json'
    });

    const backupFile = new File([blob], `backup_${new Date().toISOString().split('T')[0]}.json`, {
      type: 'application/json'
    });

    await this.uploadFile({
      file: backupFile,
      category: FileCategory.BACKUP,
      metadata: {
        description: 'Automatic backup',
        source: 'system'
      }
    });
  }

  private async calculateChecksum(file: File): Promise<string> {
    const buffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  private canAccessFile(file: CloudFile, userId: string): boolean {
    if (file.userId === userId) return true;
    if (file.permissions.public) return true;
    if (file.permissions.allowedUsers.includes(userId)) return true;
    return false;
  }

  private async incrementDownloadCount(fileId: string): Promise<void> {
    const file = await this.getFile(fileId);
    if (file) {
      await this.supabaseService.client
        .from('cloud_files')
        .update({
          downloads_count: file.permissions.downloadsCount + 1,
          updated_at: new Date().toISOString()
        })
        .eq('id', fileId);
    }
  }

  private getFilePath(file: CloudFile): string {
    return `users/${file.userId}/${file.category}/${file.id}_${file.originalName}`;
  }

  private async getFolderPath(folderId: string): Promise<string> {
    const folder = await this.supabaseService.client
      .from('folders')
      .select('path')
      .eq('id', folderId)
      .single();

    return folder.data?.path || '';
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }

  private generateToken(): string {
    return Math.random().toString(36).substring(2) +
           Math.random().toString(36).substring(2) +
           Math.random().toString(36).substring(2);
  }
}