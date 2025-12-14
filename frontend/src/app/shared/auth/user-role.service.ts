import { Injectable } from '@angular/core';
import { SupabaseService } from '../db/supabase.service';
import { UserRole, UserProfile } from './user-role.model';
import { ErrorHandlerService } from '../error-handler.service';

@Injectable({ providedIn: 'root' })
export class UserRoleService {
  constructor(
    private supabase: SupabaseService,
    private errorHandler: ErrorHandlerService
  ) {}

  async getCurrentUserProfile(): Promise<UserProfile | null> {
    try {
      const userId = this.supabase.currentUser?.id;
      if (!userId) return null;

      const { data, error } = await this.supabase.client
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          return await this.createDefaultProfile(userId);
        }
        throw error;
      }

      return this.mapDbProfileToModel(data);
    } catch (error) {
      this.errorHandler.showError('Ошибка получения профиля пользователя', 'UserRoleService');
      return null;
    }
  }

  async createUserProfile(profileData: Partial<UserProfile>): Promise<UserProfile> {
    try {
      const userId = this.supabase.currentUser?.id;
      if (!userId) throw new Error('Пользователь не авторизован');

      const { data, error } = await this.supabase.client
        .from('user_profiles')
        .insert({
          id: userId,
          email: profileData.email || this.supabase.currentUser?.email,
          role: profileData.role || UserRole.APPLICANT,
          first_name: profileData.firstName,
          last_name: profileData.lastName,
          company_name: profileData.companyName,
          phone: profileData.phone,
          avatar: profileData.avatar,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) throw error;

      return this.mapDbProfileToModel(data);
    } catch (error) {
      this.errorHandler.showError('Ошибка создания профиля пользователя', 'UserRoleService');
      throw error;
    }
  }

  async updateUserProfile(updates: Partial<UserProfile>): Promise<UserProfile> {
    try {
      const userId = this.supabase.currentUser?.id;
      if (!userId) throw new Error('Пользователь не авторизован');

      const { data, error } = await this.supabase.client
        .from('user_profiles')
        .update({
          role: updates.role,
          first_name: updates.firstName,
          last_name: updates.lastName,
          company_name: updates.companyName,
          phone: updates.phone,
          avatar: updates.avatar,
          hh_token: updates.hhToken,
          superjob_token: updates.superJobToken,
          hh_employer_id: updates.hhEmployerId,
          superjob_client_id: updates.superJobClientId,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId)
        .select()
        .single();

      if (error) throw error;

      return this.mapDbProfileToModel(data);
    } catch (error) {
      this.errorHandler.showError('Ошибка обновления профиля пользователя', 'UserRoleService');
      throw error;
    }
  }

  async setUserRole(role: UserRole): Promise<void> {
    await this.updateUserProfile({ role });
  }

  async isEmployer(): Promise<boolean> {
    const profile = await this.getCurrentUserProfile();
    return profile?.role === UserRole.EMPLOYER;
  }

  async isApplicant(): Promise<boolean> {
    const profile = await this.getCurrentUserProfile();
    return profile?.role === UserRole.APPLICANT;
  }

  async isAdmin(): Promise<boolean> {
    const profile = await this.getCurrentUserProfile();
    return profile?.role === UserRole.ADMIN;
  }

  private async createDefaultProfile(userId: string): Promise<UserProfile> {
    const defaultProfile: Partial<UserProfile> = {
      email: this.supabase.currentUser?.email,
      role: UserRole.APPLICANT
    };

    return await this.createUserProfile(defaultProfile);
  }

  private mapDbProfileToModel(data: any): UserProfile {
    return {
      id: data.id,
      email: data.email,
      role: data.role as UserRole,
      firstName: data.first_name,
      lastName: data.last_name,
      companyName: data.company_name,
      phone: data.phone,
      avatar: data.avatar,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
      hhToken: data.hh_token,
      superJobToken: data.superjob_token,
      hhEmployerId: data.hh_employer_id,
      superJobClientId: data.superjob_client_id
    };
  }
}