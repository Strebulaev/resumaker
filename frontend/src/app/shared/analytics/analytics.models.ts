export interface AnalyticsData {
  userId: string;
  profileViews: ProfileView[];
  vacancyViews: VacancyView[];
  applicationStats: ApplicationStats;
  conversionRates: ConversionRates;
  timeBasedMetrics: TimeBasedMetrics;
  geographicData: GeographicData;
  skillDemand: SkillDemand[];
  industryTrends: IndustryTrend[];
}

export interface ProfileView {
  id: string;
  profileId: string;
  viewerId?: string;
  viewerType: ViewerType;
  viewedAt: Date;
  duration?: number;
  source: ViewSource;
  deviceInfo: DeviceInfo;
}

export enum ViewerType {
  EMPLOYER = 'employer',
  RECRUITER = 'recruiter',
  CANDIDATE = 'candidate',
  ANONYMOUS = 'anonymous'
}

export enum ViewSource {
  DIRECT = 'direct',
  SEARCH = 'search',
  REFERRAL = 'referral',
  SOCIAL = 'social',
  EMAIL = 'email'
}

export interface DeviceInfo {
  userAgent: string;
  ipAddress: string;
  country?: string;
  city?: string;
}

export interface VacancyView {
  id: string;
  vacancyId: string;
  viewerId?: string;
  viewedAt: Date;
  applied: boolean;
  timeToApply?: number;
  source: ViewSource;
}

export interface ApplicationStats {
  totalApplications: number;
  applicationsThisMonth: number;
  applicationsThisWeek: number;
  responseRate: number;
  interviewRate: number;
  offerRate: number;
  acceptanceRate: number;
  averageResponseTime: number;
  averageTimeToInterview: number;
  averageTimeToOffer: number;
}

export interface ConversionRates {
  profileToApplication: number;
  applicationToInterview: number;
  interviewToOffer: number;
  offerToAcceptance: number;
  overallConversion: number;
}

export interface TimeBasedMetrics {
  dailyApplications: DailyMetric[];
  weeklyApplications: WeeklyMetric[];
  monthlyApplications: MonthlyMetric[];
  responseTimeTrend: TrendData[];
  conversionTrend: TrendData[];
}

export interface DailyMetric {
  date: string;
  applications: number;
  views: number;
  interviews: number;
  offers: number;
}

export interface WeeklyMetric {
  week: string;
  applications: number;
  views: number;
  interviews: number;
  offers: number;
}

export interface MonthlyMetric {
  month: string;
  applications: number;
  views: number;
  interviews: number;
  offers: number;
}

export interface TrendData {
  date: string;
  value: number;
  change: number;
  changePercent: number;
}

export interface GeographicData {
  countries: CountryData[];
  cities: CityData[];
  remoteVsOffice: RemoteVsOfficeData;
}

export interface CountryData {
  country: string;
  applications: number;
  views: number;
  percentage: number;
}

export interface CityData {
  city: string;
  country: string;
  applications: number;
  views: number;
  percentage: number;
}

export interface RemoteVsOfficeData {
  remote: number;
  office: number;
  hybrid: number;
  remotePercentage: number;
  officePercentage: number;
  hybridPercentage: number;
}

export interface SkillDemand {
  skill: string;
  demand: number;
  growth: number;
  averageSalary: number;
  companies: number;
  trending: boolean;
}

export interface IndustryTrend {
  industry: string;
  growth: number;
  demand: number;
  averageSalary: number;
  topSkills: string[];
  hiringCompanies: number;
}

export interface DashboardData {
  overview: OverviewStats;
  charts: ChartData[];
  insights: Insight[];
  recommendations: Recommendation[];
}

export interface OverviewStats {
  totalViews: number;
  totalApplications: number;
  activeVacancies: number;
  responseRate: number;
  averageResponseTime: number;
  topPerformingProfile: string;
  trendingSkills: string[];
}

export interface ChartData {
  id: string;
  title: string;
  type: ChartType;
  data: any;
  config: ChartConfig;
}

export enum ChartType {
  LINE = 'line',
  BAR = 'bar',
  PIE = 'pie',
  DOUGHNUT = 'doughnut',
  AREA = 'area'
}

export interface ChartConfig {
  xAxis?: string;
  yAxis?: string;
  colors?: string[];
  showLegend?: boolean;
  showGrid?: boolean;
}

export interface Insight {
  id: string;
  type: InsightType;
  title: string;
  description: string;
  impact: ImpactLevel;
  data: any;
  createdAt: Date;
}

export enum InsightType {
  TREND = 'trend',
  OPPORTUNITY = 'opportunity',
  WARNING = 'warning',
  ACHIEVEMENT = 'achievement'
}

export enum ImpactLevel {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

export interface Recommendation {
  id: string;
  type: RecommendationType;
  title: string;
  description: string;
  priority: PriorityLevel;
  actions: ActionItem[];
  expectedImpact: string;
  createdAt: Date;
}

export enum RecommendationType {
  SKILL_DEVELOPMENT = 'skill_development',
  PROFILE_OPTIMIZATION = 'profile_optimization',
  NETWORKING = 'networking',
  APPLICATION_STRATEGY = 'application_strategy',
  CAREER_CHANGE = 'career_change'
}

export enum PriorityLevel {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high'
}

export interface ActionItem {
  id: string;
  description: string;
  completed: boolean;
  dueDate?: Date;
  link?: string;
}

export interface ReportData {
  id: string;
  userId: string;
  title: string;
  type: ReportType;
  dateRange: DateRange;
  data: any;
  generatedAt: Date;
  format: ReportFormat;
}

export enum ReportType {
  APPLICATION_SUMMARY = 'application_summary',
  SKILL_ANALYSIS = 'skill_analysis',
  INDUSTRY_TRENDS = 'industry_trends',
  GEOGRAPHIC_ANALYSIS = 'geographic_analysis',
  PERFORMANCE_REPORT = 'performance_report'
}

export interface DateRange {
  start: Date;
  end: Date;
}

export enum ReportFormat {
  PDF = 'pdf',
  EXCEL = 'excel',
  JSON = 'json',
  HTML = 'html'
}

export interface Alert {
  id: string;
  userId: string;
  type: AlertType;
  title: string;
  message: string;
  severity: AlertSeverity;
  read: boolean;
  actionRequired: boolean;
  actionUrl?: string;
  createdAt: Date;
  expiresAt?: Date;
}

export enum AlertType {
  APPLICATION_RESPONSE = 'application_response',
  PROFILE_VIEW = 'profile_view',
  SKILL_DEMAND = 'skill_demand',
  MARKET_TREND = 'market_trend',
  SYSTEM_UPDATE = 'system_update'
}

export enum AlertSeverity {
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
  SUCCESS = 'success'
}