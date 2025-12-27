import { Injectable } from '@angular/core';
import { SupabaseService } from '../db/supabase.service';
import { Team, TeamMember, TeamRole, TeamInvitation, TeamActivity, KnowledgeBase, Comment, Notification } from './team.models';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private currentTeamSubject = new BehaviorSubject<Team | null>(null);
  public currentTeam$ = this.currentTeamSubject.asObservable();

  constructor(private supabaseService: SupabaseService) {}

  async createTeam(name: string, description?: string): Promise<Team> {
    const user = this.supabaseService.currentUser;
    if (!user) throw new Error('User not authenticated');

    const team: Partial<Team> = {
      name,
      description,
      ownerId: user.id,
      members: [{
        id: this.generateId(),
        userId: user.id,
        email: user.email || '',
        role: TeamRole.OWNER,
        permissions: this.getDefaultPermissions(TeamRole.OWNER),
        status: 'active' as any,
        invitedAt: new Date(),
        joinedAt: new Date(),
        lastActiveAt: new Date()
      }],
      settings: {
        allowMemberInvites: true,
        requireApprovalForHires: false,
        defaultPermissions: [],
        notifications: {
          newApplications: true,
          interviewScheduled: true,
          memberJoined: true,
          memberLeft: true
        }
      },
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const { data, error } = await this.supabaseService.client
      .from('teams')
      .insert(team)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getUserTeams(): Promise<Team[]> {
    const user = this.supabaseService.currentUser;
    if (!user) throw new Error('User not authenticated');

    const { data: memberData, error: memberError } = await this.supabaseService.client
      .from('team_members')
      .select('team_id')
      .eq('user_id', user.id)
      .eq('status', 'active');

    if (memberError) throw memberError;

    if (!memberData || memberData.length === 0) return [];

    const teamIds = memberData.map(m => m.team_id);

    const { data: teamsData, error: teamsError } = await this.supabaseService.client
      .from('teams')
      .select('*')
      .in('id', teamIds);

    if (teamsError) throw teamsError;

    return teamsData || [];
  }

  async getTeam(teamId: string): Promise<Team> {
    const { data, error } = await this.supabaseService.client
      .from('teams')
      .select(`
        *,
        members:team_members(*)
      `)
      .eq('id', teamId)
      .single();

    if (error) throw error;
    return data;
  }

  async inviteMember(teamId: string, email: string, role: TeamRole): Promise<TeamInvitation> {
    const user = this.supabaseService.currentUser;
    if (!user) throw new Error('User not authenticated');

    const invitation: Partial<TeamInvitation> = {
      teamId,
      email,
      role,
      invitedBy: user.id,
      invitedAt: new Date(),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      status: 'pending' as any,
      token: this.generateToken()
    };

    const { data, error } = await this.supabaseService.client
      .from('team_invitations')
      .insert(invitation)
      .select()
      .single();

    if (error) throw error;

    await this.logActivity(teamId, user.id, 'member_invitation_sent', 'invitation', data.id);
    return data;
  }

  async acceptInvitation(token: string): Promise<void> {
    const { data: invitation, error: fetchError } = await this.supabaseService.client
      .from('team_invitations')
      .select('*')
      .eq('token', token)
      .eq('status', 'pending')
      .single();

    if (fetchError || !invitation) throw new Error('Invalid invitation');

    if (new Date() > new Date(invitation.expires_at)) {
      throw new Error('Invitation expired');
    }

    const user = this.supabaseService.currentUser;
    if (!user || user.email !== invitation.email) {
      throw new Error('Invalid user for invitation');
    }

    const member: Partial<TeamMember> = {
      userId: user.id,
      email: user.email || '',
      role: invitation.role,
      permissions: this.getDefaultPermissions(invitation.role),
      status: 'active' as any,
      invitedAt: new Date(invitation.invited_at),
      joinedAt: new Date(),
      lastActiveAt: new Date()
    };

    const { error: memberError } = await this.supabaseService.client
      .from('team_members')
      .insert(member);

    if (memberError) throw memberError;

    await this.supabaseService.client
      .from('team_invitations')
      .update({ status: 'accepted' })
      .eq('id', invitation.id);

    await this.logActivity(invitation.team_id, user.id, 'member_joined', 'team', invitation.team_id);
  }

  async removeMember(teamId: string, memberId: string): Promise<void> {
    const user = this.supabaseService.currentUser;
    if (!user) throw new Error('User not authenticated');

    const { error } = await this.supabaseService.client
      .from('team_members')
      .update({ status: 'removed', lastActiveAt: new Date() })
      .eq('id', memberId)
      .eq('team_id', teamId);

    if (error) throw error;

    await this.logActivity(teamId, user.id, 'member_removed', 'member', memberId);
  }

  async updateMemberRole(teamId: string, memberId: string, role: TeamRole): Promise<void> {
    const user = this.supabaseService.currentUser;
    if (!user) throw new Error('User not authenticated');

    const { error } = await this.supabaseService.client
      .from('team_members')
      .update({
        role,
        permissions: this.getDefaultPermissions(role),
        lastActiveAt: new Date()
      })
      .eq('id', memberId)
      .eq('team_id', teamId);

    if (error) throw error;

    await this.logActivity(teamId, user.id, 'member_role_updated', 'member', memberId);
  }

  async switchTeam(team: Team): Promise<void> {
    this.currentTeamSubject.next(team);
  }

  async getTeamAnalytics(teamId: string, period: string): Promise<any> {
    const { data, error } = await this.supabaseService.client
      .from('team_analytics')
      .select('*')
      .eq('team_id', teamId)
      .eq('period', period)
      .single();

    if (error) throw error;
    return data;
  }

  async getKnowledgeBase(teamId: string): Promise<KnowledgeBase[]> {
    const { data, error } = await this.supabaseService.client
      .from('knowledge_base')
      .select('*')
      .eq('team_id', teamId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async createKnowledgeEntry(teamId: string, entry: Partial<KnowledgeBase>): Promise<KnowledgeBase> {
    const user = this.supabaseService.currentUser;
    if (!user) throw new Error('User not authenticated');

    const knowledgeEntry: Partial<KnowledgeBase> = {
      ...entry,
      teamId,
      authorId: user.id,
      createdAt: new Date(),
      updatedAt: new Date(),
      views: 0,
      helpful: 0
    };

    const { data, error } = await this.supabaseService.client
      .from('knowledge_base')
      .insert(knowledgeEntry)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getNotifications(userId: string): Promise<Notification[]> {
    const { data, error } = await this.supabaseService.client
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async markNotificationAsRead(notificationId: string): Promise<void> {
    const { error } = await this.supabaseService.client
      .from('notifications')
      .update({ read: true })
      .eq('id', notificationId);

    if (error) throw error;
  }

  private getDefaultPermissions(role: TeamRole): any[] {
    const permissions = {
      [TeamRole.OWNER]: [
        { resource: '*', actions: ['*'] }
      ],
      [TeamRole.ADMIN]: [
        { resource: 'team', actions: ['read', 'update'] },
        { resource: 'members', actions: ['read', 'create', 'update', 'delete'] },
        { resource: 'vacancies', actions: ['*'] },
        { resource: 'candidates', actions: ['*'] }
      ],
      [TeamRole.HR_MANAGER]: [
        { resource: 'vacancies', actions: ['read', 'create', 'update'] },
        { resource: 'candidates', actions: ['read', 'create', 'update'] },
        { resource: 'analytics', actions: ['read'] }
      ],
      [TeamRole.RECRUITER]: [
        { resource: 'vacancies', actions: ['read', 'update'] },
        { resource: 'candidates', actions: ['read', 'create', 'update'] }
      ],
      [TeamRole.INTERVIEWER]: [
        { resource: 'candidates', actions: ['read', 'update'] },
        { resource: 'interviews', actions: ['read', 'create', 'update'] }
      ],
      [TeamRole.VIEWER]: [
        { resource: 'vacancies', actions: ['read'] },
        { resource: 'candidates', actions: ['read'] },
        { resource: 'analytics', actions: ['read'] }
      ]
    };

    return permissions[role] || [];
  }

  private async logActivity(teamId: string, userId: string, action: string, resourceType: string, resourceId: string, details?: any): Promise<void> {
    const activity: Partial<TeamActivity> = {
      teamId,
      userId,
      action: action as any,
      resourceType,
      resourceId,
      details,
      createdAt: new Date()
    };

    await this.supabaseService.client
      .from('team_activities')
      .insert(activity);
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }

  private generateToken(): string {
    return Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);
  }
}