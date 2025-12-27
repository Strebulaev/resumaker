export interface CloudFile {
  id: string;
  userId: string;
  name: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  thumbnailUrl?: string;
  category: FileCategory;
  tags: string[];
  metadata: FileMetadata;
  permissions: FilePermissions;
  version: number;
  versions: FileVersion[];
  createdAt: Date;
  updatedAt: Date;
  expiresAt?: Date;
}

export enum FileCategory {
  RESUME = 'resume',
  COVER_LETTER = 'cover_letter',
  PORTFOLIO = 'portfolio',
  CERTIFICATE = 'certificate',
  PROJECT_DOC = 'project_doc',
  PROFILE_PIC = 'profile_pic',
  ATTACHMENT = 'attachment',
  BACKUP = 'backup'
}

export interface FileMetadata {
  description?: string;
  language?: string;
  encoding?: string;
  checksum: string;
  compression?: string;
  encryption?: boolean;
  source?: string;
  relatedEntityId?: string;
  relatedEntityType?: string;
}

export interface FilePermissions {
  public: boolean;
  password?: string;
  allowedUsers: string[];
  allowedDomains: string[];
  downloadLimit?: number;
  downloadsCount: number;
}

export interface FileVersion {
  version: number;
  url: string;
  size: number;
  createdAt: Date;
  createdBy: string;
  changes?: string;
}

export interface UploadRequest {
  file: File;
  category: FileCategory;
  metadata?: Partial<FileMetadata>;
  permissions?: Partial<FilePermissions>;
  tags?: string[];
}

export interface UploadResult {
  success: boolean;
  file?: CloudFile;
  error?: string;
  uploadUrl?: string;
  uploadFields?: Record<string, string>;
}

export interface StorageQuota {
  used: number;
  limit: number;
  filesCount: number;
  filesLimit: number;
  bandwidthUsed: number;
  bandwidthLimit: number;
}

export interface StoragePlan {
  id: string;
  name: string;
  price: number;
  currency: string;
  storageLimit: number;
  filesLimit: number;
  bandwidthLimit: number;
  features: string[];
  popular?: boolean;
}

export interface ShareLink {
  id: string;
  fileId: string;
  token: string;
  url: string;
  expiresAt?: Date;
  password?: string;
  downloadLimit?: number;
  downloadsCount: number;
  createdAt: Date;
  createdBy: string;
}

export interface Folder {
  id: string;
  userId: string;
  name: string;
  parentId?: string;
  path: string;
  filesCount: number;
  totalSize: number;
  permissions: FolderPermissions;
  createdAt: Date;
  updatedAt: Date;
}

export interface FolderPermissions {
  public: boolean;
  allowedUsers: string[];
  inheritParent: boolean;
}

export interface SyncStatus {
  fileId: string;
  status: SyncStatusType;
  progress: number;
  error?: string;
  lastSync: Date;
  nextSync?: Date;
}

export enum SyncStatusType {
  PENDING = 'pending',
  SYNCING = 'syncing',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CONFLICT = 'conflict'
}

export interface BackupConfig {
  id: string;
  userId: string;
  enabled: boolean;
  frequency: BackupFrequency;
  retention: number;
  includeCategories: FileCategory[];
  excludePatterns: string[];
  destinations: BackupDestination[];
  lastBackup?: Date;
  nextBackup?: Date;
}

export enum BackupFrequency {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  MANUAL = 'manual'
}

export interface BackupDestination {
  type: 'local' | 'cloud' | 'external';
  path?: string;
  credentials?: Record<string, string>;
}

export interface FileOperation {
  id: string;
  userId: string;
  operation: FileOperationType;
  fileId?: string;
  folderId?: string;
  details: Record<string, any>;
  status: OperationStatus;
  progress: number;
  startedAt: Date;
  completedAt?: Date;
  error?: string;
}

export enum FileOperationType {
  UPLOAD = 'upload',
  DOWNLOAD = 'download',
  DELETE = 'delete',
  MOVE = 'move',
  COPY = 'copy',
  RENAME = 'rename',
  SHARE = 'share',
  BACKUP = 'backup',
  RESTORE = 'restore',
  COMPRESS = 'compress',
  EXTRACT = 'extract'
}

export enum OperationStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled'
}