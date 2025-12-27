export interface MultiProfileResume {
  id: string;
  userId: string;
  title: string;
  profiles: ProfileContribution[];
  content: ResumeContent;
  targetPosition: string;
  generatedAt: Date;
  version: number;
}

export interface ProfileContribution {
  profileId: string;
  profileName: string;
  weight: number;
  sections: ContributionSection[];
}

export interface ContributionSection {
  sectionType: ResumeSectionType;
  content: string;
  sourceProfile: string;
  relevanceScore: number;
}

export enum ResumeSectionType {
  SUMMARY = 'summary',
  EXPERIENCE = 'experience',
  PROJECTS = 'projects',
  SKILLS = 'skills',
  EDUCATION = 'education',
  CERTIFICATIONS = 'certifications',
  ACHIEVEMENTS = 'achievements'
}

export interface ResumeContent {
  summary: string;
  experience: ExperienceEntry[];
  projects: ProjectEntry[];
  skills: SkillEntry[];
  education: EducationEntry[];
  certifications: CertificationEntry[];
  languages: LanguageEntry[];
  customSections: CustomSection[];
}

export interface ExperienceEntry {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  description: string;
  achievements: string[];
  technologies: string[];
  sourceProfile: string;
  relevanceScore: number;
}

export interface ProjectEntry {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  role: string;
  startDate: string;
  endDate?: string;
  achievements: string[];
  url?: string;
  sourceProfile: string;
  relevanceScore: number;
}

export interface SkillEntry {
  name: string;
  level: SkillLevel;
  yearsOfExperience: number;
  category: string;
  endorsements: number;
  sourceProfiles: string[];
}

export enum SkillLevel {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
  EXPERT = 'expert'
}

export interface EducationEntry {
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate?: string;
  gpa?: string;
  achievements: string[];
  sourceProfile: string;
}

export interface CertificationEntry {
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  url?: string;
  sourceProfile: string;
}

export interface LanguageEntry {
  language: string;
  proficiency: LanguageProficiency;
  sourceProfile: string;
}

export enum LanguageProficiency {
  ELEMENTARY = 'elementary',
  LIMITED_WORKING = 'limited_working',
  PROFESSIONAL_WORKING = 'professional_working',
  FULL_PROFESSIONAL = 'full_professional',
  NATIVE = 'native'
}

export interface CustomSection {
  title: string;
  content: string;
  order: number;
  sourceProfile: string;
}

export interface CoverLetterGeneration {
  id: string;
  userId: string;
  resumeId: string;
  vacancyId: string;
  content: CoverLetterContent;
  generatedAt: Date;
  version: number;
}

export interface CoverLetterContent {
  greeting: string;
  introduction: string;
  body: string[];
  conclusion: string;
  signOff: string;
  contactInfo: ContactInfo;
}

export interface ContactInfo {
  name: string;
  email: string;
  phone?: string;
  linkedin?: string;
  portfolio?: string;
  location?: string;
}

export interface GenerationRequest {
  profiles: string[];
  targetPosition: string;
  vacancyDescription?: string;
  companyName?: string;
  emphasis: GenerationEmphasis[];
  length: ResumeLength;
  tone: ResumeTone;
}

export enum GenerationEmphasis {
  TECHNICAL_SKILLS = 'technical_skills',
  LEADERSHIP = 'leadership',
  PROJECTS = 'projects',
  EDUCATION = 'education',
  ACHIEVEMENTS = 'achievements',
  INDUSTRY_EXPERIENCE = 'industry_experience'
}

export enum ResumeLength {
  CONCISE = 'concise',
  STANDARD = 'standard',
  DETAILED = 'detailed'
}

export enum ResumeTone {
  PROFESSIONAL = 'professional',
  CREATIVE = 'creative',
  TECHNICAL = 'technical',
  EXECUTIVE = 'executive'
}

export interface OptimizationResult {
  originalResume: MultiProfileResume;
  optimizedResume: MultiProfileResume;
  changes: OptimizationChange[];
  keywordMatches: KeywordMatch[];
  atsScore: number;
  readabilityScore: number;
}

export interface OptimizationChange {
  section: ResumeSectionType;
  changeType: ChangeType;
  description: string;
  impact: 'positive' | 'neutral' | 'negative';
}

export enum ChangeType {
  ADDED = 'added',
  REMOVED = 'removed',
  MODIFIED = 'modified',
  REORDERED = 'reordered'
}

export interface KeywordMatch {
  keyword: string;
  frequency: number;
  relevance: number;
  sections: string[];
}

export interface ResumeTemplate {
  id: string;
  name: string;
  description: string;
  category: TemplateCategory;
  preview: string;
  styles: TemplateStyles;
  sections: TemplateSection[];
}

export enum TemplateCategory {
  TRADITIONAL = 'traditional',
  MODERN = 'modern',
  CREATIVE = 'creative',
  TECHNICAL = 'technical',
  EXECUTIVE = 'executive'
}

export interface TemplateStyles {
  fontFamily: string;
  fontSize: string;
  colors: TemplateColors;
  spacing: TemplateSpacing;
  layout: string;
}

export interface TemplateColors {
  primary: string;
  secondary: string;
  accent: string;
  text: string;
  background: string;
}

export interface TemplateSpacing {
  margin: string;
  padding: string;
  lineHeight: string;
}

export interface TemplateSection {
  type: ResumeSectionType;
  required: boolean;
  maxLength?: number;
  style: string;
}

export interface ExportOptions {
  format: ExportFormat;
  template: string;
  includePhotos: boolean;
  includeLinks: boolean;
  colorScheme: string;
  language: string;
}

export enum ExportFormat {
  PDF = 'pdf',
  DOCX = 'docx',
  HTML = 'html',
  JSON = 'json',
  TXT = 'txt'
}