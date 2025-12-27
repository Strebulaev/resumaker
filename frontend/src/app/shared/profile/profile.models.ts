export interface Profile {
  id: string;
  userId: string;
  type: ProfileType;
  name: string;
  description?: string;
  data: any;
  experience?: Experience[];
  projects?: Project[];
  skills?: Skill[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export enum ProfileType {
  APPLICANT = 'applicant',
  EMPLOYER = 'employer'
}

export interface ApplicantProfile {
  personalInfo: PersonalInfo;
  experience: Experience[];
  projects: Project[];
  education: Education[];
  skills: Skill[];
  careerGoals: CareerGoals;
  settings: ApplicantSettings;
}

export interface EmployerProfile {
  companyInfo: CompanyInfo;
  team: TeamMember[];
  vacancies: Vacancy[];
  candidates: Candidate[];
  settings: EmployerSettings;
}

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  photo?: string;
  location: Location;
  birthDate?: Date;
}

export interface Location {
  country: string;
  city: string;
  remoteWork: boolean;
  relocation: boolean;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: Date;
  endDate?: Date;
  description: string;
  achievements: string[];
  technologies: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  role: string;
  startDate: Date;
  endDate?: Date;
  achievements: string[];
  links: ProjectLinks;
  visibility: Visibility;
  source: ProjectSource;
}

export interface ProjectLinks {
  github?: string;
  demo?: string;
  docs?: string;
}

export enum Visibility {
  PUBLIC = 'public',
  EMPLOYERS = 'employers',
  PRIVATE = 'private'
}

export enum ProjectSource {
  MANUAL = 'manual',
  GITHUB = 'github',
  UPLOAD = 'upload'
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: Date;
  endDate?: Date;
  gpa?: number;
}

export interface Skill {
  name: string;
  level: number;
  category: string;
  lastUsed?: Date;
}

export interface CareerGoals {
  positions: string[];
  industries: string[];
  salaryRange: SalaryRange;
  employmentType: EmploymentType;
  availabilityDate?: Date;
}

export interface SalaryRange {
  min: number;
  max: number;
  currency: string;
}

export enum EmploymentType {
  FULL_TIME = 'full_time',
  PART_TIME = 'part_time',
  CONTRACT = 'contract',
  FREELANCE = 'freelance'
}

export interface ApplicantSettings {
  visibility: ProfileVisibility;
  notifications: NotificationSettings;
  automation: AutomationSettings;
}

export enum ProfileVisibility {
  PUBLIC = 'public',
  EMPLOYERS_ONLY = 'employers_only',
  ANONYMOUS = 'anonymous',
  PRIVATE = 'private'
}

export interface NotificationSettings {
  newVacancies: boolean;
  profileViews: boolean;
  messages: boolean;
  recommendations: boolean;
}

export interface AutomationSettings {
  autoApply: boolean;
  autoReject: boolean;
  autoUpdate: boolean;
}

export interface CompanyInfo {
  name: string;
  description: string;
  industry: string;
  size: CompanySize;
  founded: number;
  website?: string;
  logo?: string;
  location: Location;
}

export enum CompanySize {
  STARTUP = '1-10',
  SMALL = '11-50',
  MEDIUM = '51-200',
  LARGE = '201-1000',
  ENTERPRISE = '1000+'
}

export interface TeamMember {
  id: string;
  userId?: string;
  email: string;
  role: TeamRole;
  permissions: Permission[];
  invitedAt: Date;
  joinedAt?: Date;
  isActive: boolean;
}

export enum TeamRole {
  OWNER = 'owner',
  HR_DIRECTOR = 'hr_director',
  RECRUITER = 'recruiter',
  VIEWER = 'viewer',
  ANALYST = 'analyst',
  HIRING_MANAGER = 'hiring_manager'
}

export interface Permission {
  resource: string;
  actions: string[];
}

export interface Vacancy {
  id: string;
  title: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  location: Location;
  salary?: SalaryRange;
  employmentType: EmploymentType;
  level: ExperienceLevel;
  status: VacancyStatus;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  assignedTo?: string[];
  views?: number;
  applications?: number;
  shortlisted?: number;
  interviews?: number;
  offers?: number;
  hires?: number;
  companyId?: string;
  platform?: string;
  employer?: any;
  name?: string;
  key_skills?: any[];
}

export enum ExperienceLevel {
  INTERN = 'intern',
  JUNIOR = 'junior',
  MIDDLE = 'middle',
  SENIOR = 'senior',
  LEAD = 'lead',
  EXECUTIVE = 'executive'
}

export enum VacancyStatus {
  DRAFT = 'draft',
  ACTIVE = 'active',
  PAUSED = 'paused',
  CLOSED = 'closed'
}

export interface Candidate {
  id: string;
  applicantId: string;
  vacancyId: string;
  status: CandidateStatus;
  matchScore: number;
  appliedAt: Date;
  lastActivity: Date;
  assignedTo?: string;
  notes: Note[];
  interviews: Interview[];
}

export enum CandidateStatus {
  NEW = 'new',
  REVIEWED = 'reviewed',
  INTERVIEW_SCHEDULED = 'interview_scheduled',
  INTERVIEWED = 'interviewed',
  OFFERED = 'offered',
  HIRED = 'hired',
  REJECTED = 'rejected'
}

export interface Note {
  id: string;
  authorId: string;
  content: string;
  createdAt: Date;
  isPrivate: boolean;
}

export interface Interview {
  id: string;
  type: InterviewType;
  scheduledAt: Date;
  duration: number;
  interviewers: string[];
  location?: string;
  notes?: string;
  feedback?: InterviewFeedback;
}

export enum InterviewType {
  PHONE = 'phone',
  VIDEO = 'video',
  IN_PERSON = 'in_person',
  TECHNICAL = 'technical',
  FINAL = 'final'
}

export interface InterviewFeedback {
  rating: number;
  strengths: string[];
  weaknesses: string[];
  recommendation: HireRecommendation;
  notes: string;
}

export enum HireRecommendation {
  STRONG_HIRE = 'strong_hire',
  HIRE = 'hire',
  NO_HIRE = 'no_hire',
  CONSIDER = 'consider'
}

export interface EmployerSettings {
  notifications: NotificationSettings;
  integrations: IntegrationSettings;
  security: SecuritySettings;
}

export interface IntegrationSettings {
  googleCalendar: boolean;
  slack: boolean;
  ats: string;
}

export interface SecuritySettings {
  twoFactor: boolean;
  ipWhitelist: string[];
  sessionTimeout: number;
}