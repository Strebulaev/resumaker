export interface ProjectAnalysis {
  id: string;
  projectId: string;
  source: ProjectSource;
  sourceUrl?: string;
  analysisDate: Date;
  technologies: Technology[];
  architecture: ArchitectureAnalysis;
  quality: QualityAnalysis;
  complexity: ComplexityAnalysis;
  achievements: Achievement[];
  recommendations: Recommendation[];
  metadata: ProjectMetadata;
}

export enum ProjectSource {
  GITHUB = 'github',
  GITLAB = 'gitlab',
  BITBUCKET = 'bitbucket',
  MANUAL = 'manual',
  UPLOAD = 'upload'
}

export interface Technology {
  name: string;
  version?: string;
  category: TechCategory;
  confidence: number;
  usage: TechUsage;
}

export enum TechCategory {
  LANGUAGE = 'language',
  FRAMEWORK = 'framework',
  LIBRARY = 'library',
  DATABASE = 'database',
  TOOL = 'tool',
  INFRASTRUCTURE = 'infrastructure'
}

export interface TechUsage {
  files: number;
  linesOfCode: number;
  percentage: number;
  primary: boolean;
}

export interface ArchitectureAnalysis {
  pattern: ArchitecturePattern;
  layers: ArchitectureLayer[];
  components: Component[];
  dependencies: Dependency[];
  scalability: ScalabilityScore;
}

export enum ArchitecturePattern {
  MVC = 'mvc',
  MVVM = 'mvvm',
  MICROSERVICES = 'microservices',
  MONOLITH = 'monolith',
  SERVERLESS = 'serverless',
  EVENT_DRIVEN = 'event_driven'
}

export interface ArchitectureLayer {
  name: string;
  technologies: string[];
  responsibility: string;
  complexity: number;
}

export interface Component {
  name: string;
  type: ComponentType;
  dependencies: string[];
  files: string[];
  complexity: number;
}

export enum ComponentType {
  CONTROLLER = 'controller',
  SERVICE = 'service',
  MODEL = 'model',
  VIEW = 'view',
  UTILITY = 'utility',
  CONFIG = 'config'
}

export interface Dependency {
  from: string;
  to: string;
  type: DependencyType;
  strength: number;
}

export enum DependencyType {
  IMPORT = 'import',
  INHERITANCE = 'inheritance',
  COMPOSITION = 'composition',
  REFERENCE = 'reference'
}

export interface ScalabilityScore {
  score: number;
  factors: ScalabilityFactor[];
  recommendations: string[];
}

export interface ScalabilityFactor {
  factor: string;
  score: number;
  impact: 'positive' | 'negative' | 'neutral';
}

export interface QualityAnalysis {
  overall: number;
  metrics: QualityMetric[];
  issues: CodeIssue[];
  coverage?: number;
  maintainability: number;
}

export interface QualityMetric {
  name: string;
  value: number;
  benchmark: number;
  status: 'excellent' | 'good' | 'average' | 'poor';
}

export interface CodeIssue {
  type: IssueType;
  severity: IssueSeverity;
  file: string;
  line?: number;
  description: string;
  suggestion?: string;
}

export enum IssueType {
  SECURITY = 'security',
  PERFORMANCE = 'performance',
  MAINTAINABILITY = 'maintainability',
  STYLE = 'style',
  BUG = 'bug'
}

export enum IssueSeverity {
  CRITICAL = 'critical',
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low',
  INFO = 'info'
}

export interface ComplexityAnalysis {
  cyclomatic: number;
  cognitive: number;
  linesOfCode: number;
  files: number;
  functions: number;
  classes: number;
  level: ComplexityLevel;
}

export enum ComplexityLevel {
  SIMPLE = 'simple',
  MODERATE = 'moderate',
  COMPLEX = 'complex',
  VERY_COMPLEX = 'very_complex'
}

export interface Achievement {
  type: AchievementType;
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  technologies: string[];
  evidence: string[];
}

export enum AchievementType {
  PERFORMANCE = 'performance',
  SCALABILITY = 'scalability',
  SECURITY = 'security',
  INNOVATION = 'innovation',
  ARCHITECTURE = 'architecture',
  TESTING = 'testing'
}

export interface Recommendation {
  type: RecommendationType;
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  effort: 'low' | 'medium' | 'high';
  impact: 'high' | 'medium' | 'low';
  technologies?: string[];
}

export enum RecommendationType {
  SECURITY = 'security',
  PERFORMANCE = 'performance',
  MAINTAINABILITY = 'maintainability',
  SCALABILITY = 'scalability',
  TESTING = 'testing',
  MODERNIZATION = 'modernization'
}

export interface ProjectMetadata {
  name: string;
  description?: string;
  version?: string;
  license?: string;
  contributors: Contributor[];
  commitHistory: CommitInfo[];
  lastCommit?: Date;
  stars?: number;
  forks?: number;
  issues?: number;
  pullRequests?: number;
}

export interface Contributor {
  name: string;
  email: string;
  commits: number;
  additions: number;
  deletions: number;
  firstCommit: Date;
  lastCommit: Date;
}

export interface CommitInfo {
  hash: string;
  author: string;
  date: Date;
  message: string;
  files: number;
  additions: number;
  deletions: number;
}

export interface AnalysisRequest {
  source: ProjectSource;
  url?: string;
  files?: File[];
  options: AnalysisOptions;
}

export interface AnalysisOptions {
  deepAnalysis: boolean;
  includeSecurity: boolean;
  includePerformance: boolean;
  includeDependencies: boolean;
  maxFileSize: number;
  timeout: number;
}

export interface AnalysisResult {
  success: boolean;
  analysis?: ProjectAnalysis;
  error?: string;
  warnings: string[];
  processingTime: number;
}