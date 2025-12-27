export interface Team {
  id: string;
  name: string;
  description?: string;
  ownerId: string;
  members: TeamMember[];
  settings: TeamSettings;
  createdAt: Date;
  updatedAt: Date;
}

export interface TeamMember {
  id: string;
  userId: string;
  email: string;
  role: TeamRole;
  permissions: Permission[];
  status: MemberStatus;
  invitedAt: Date;
  joinedAt?: Date;
  lastActiveAt?: Date;
}

export enum TeamRole {
  OWNER = 'owner',
  ADMIN = 'admin',
  HR_MANAGER = 'hr_manager',
  RECRUITER = 'recruiter',
  INTERVIEWER = 'interviewer',
  VIEWER = 'viewer'
}

export enum MemberStatus {
  PENDING = 'pending',
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  REMOVED = 'removed'
}

export interface Permission {
  resource: string;
  actions: string[];
}

export interface TeamSettings {
  allowMemberInvites: boolean;
  requireApprovalForHires: boolean;
  defaultPermissions: Permission[];
  notifications: TeamNotificationSettings;
}

export interface TeamNotificationSettings {
  newApplications: boolean;
  interviewScheduled: boolean;
  memberJoined: boolean;
  memberLeft: boolean;
}

export interface TeamInvitation {
  id: string;
  teamId: string;
  email: string;
  role: TeamRole;
  invitedBy: string;
  invitedAt: Date;
  expiresAt: Date;
  status: InvitationStatus;
  token: string;
}

export enum InvitationStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  DECLINED = 'declined',
  EXPIRED = 'expired'
}

export interface TeamActivity {
  id: string;
  teamId: string;
  userId: string;
  action: TeamAction;
  resourceType: string;
  resourceId: string;
  details?: any;
  createdAt: Date;
}

export enum TeamAction {
  MEMBER_ADDED = 'member_added',
  MEMBER_REMOVED = 'member_removed',
  VACANCY_CREATED = 'vacancy_created',
  VACANCY_UPDATED = 'vacancy_updated',
  CANDIDATE_ADDED = 'candidate_added',
  CANDIDATE_STATUS_CHANGED = 'candidate_status_changed',
  INTERVIEW_SCHEDULED = 'interview_scheduled',
  INTERVIEW_COMPLETED = 'interview_completed'
}

export interface TeamAnalytics {
  teamId: string;
  period: AnalyticsPeriod;
  metrics: TeamMetrics;
  charts: TeamCharts;
}

export enum AnalyticsPeriod {
  WEEK = 'week',
  MONTH = 'month',
  QUARTER = 'quarter',
  YEAR = 'year'
}

export interface TeamMetrics {
  totalVacancies: number;
  activeVacancies: number;
  totalCandidates: number;
  newCandidatesThisPeriod: number;
  interviewsScheduled: number;
  interviewsCompleted: number;
  offersSent: number;
  offersAccepted: number;
  timeToHire: number;
  sourceEffectiveness: SourceMetrics[];
}

export interface SourceMetrics {
  source: string;
  candidates: number;
  hires: number;
  conversionRate: number;
}

export interface TeamCharts {
  applicationsOverTime: ChartData;
  statusDistribution: ChartData;
  timeToHireDistribution: ChartData;
  sourceBreakdown: ChartData;
}

export interface ChartData {
  labels: string[];
  datasets: ChartDataset[];
}

export interface ChartDataset {
  label: string;
  data: number[];
  backgroundColor?: string;
  borderColor?: string;
}

export interface KnowledgeBase {
  id: string;
  teamId: string;
  title: string;
  content: string;
  category: KnowledgeCategory;
  tags: string[];
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
  views: number;
  helpful: number;
}

export enum KnowledgeCategory {
  TEMPLATES = 'templates',
  SCRIPTS = 'scripts',
  METRICS = 'metrics',
  INSTRUCTIONS = 'instructions',
  BEST_PRACTICES = 'best_practices',
  CASE_STUDIES = 'case_studies'
}

export interface Comment {
  id: string;
  resourceId: string;
  resourceType: string;
  authorId: string;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
  isPrivate: boolean;
  mentions: string[];
}

export interface Notification {
  id: string;
  userId: string;
  teamId?: string;
  type: NotificationType;
  title: string;
  message: string;
  data?: any;
  read: boolean;
  createdAt: Date;
}

export enum NotificationType {
  TEAM_INVITATION = 'team_invitation',
  NEW_CANDIDATE = 'new_candidate',
  INTERVIEW_REMINDER = 'interview_reminder',
  CANDIDATE_STATUS_CHANGE = 'candidate_status_change',
  TEAM_ACTIVITY = 'team_activity',
  SYSTEM_UPDATE = 'system_update'
}