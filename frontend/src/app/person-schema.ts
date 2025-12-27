import { z } from 'zod';

// Базовые схемы
const phoneSchema = z.string().regex(/^\+[0-9]{11}$/).optional().or(z.literal(''));
const emailSchema = z.string().email();
const dateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional();
const dateTimeSchema = z.string().datetime().optional();
const urlSchema = z.string().url().optional().or(z.literal(''));
const uuidSchema = z.string().uuid();

// Контакты
const contactSchema = z.object({
  phone: phoneSchema,
  email: emailSchema,
  linkedin: urlSchema,
  github: urlSchema,
  telegram: z.string().optional().or(z.literal('')),
  website: urlSchema,
  other_contacts: z.array(z.object({
    type: z.enum(['whatsapp', 'skype', 'discord', 'other']),
    value: z.string()
  })).optional()
});

// Локация
const locationSchema = z.object({
  country: z.string().optional().or(z.literal('')),
  city: z.string(),
  timezone: z.string().optional(),
  relocation: z.boolean().default(false),
  relocation_countries: z.array(z.string()).optional(),
  remote: z.boolean().default(false),
  business_trips: z.boolean().default(false),
  preferred_locations: z.array(z.string()).optional()
});

// Языки
const languageSchema = z.object({
  language: z.string(),
  level: z.enum(['A1', 'A2', 'B1', 'B2', 'C1', 'C2']),
  certificate: z.string().optional(),
  certificate_url: urlSchema
});

// Навыки
const skillSchema = z.object({
  area: z.string(),
  name: z.string(),
  level: z.number().int().min(1).max(10),
  years_of_experience: z.number().min(0).optional(),
  last_used: dateSchema,
  projects_count: z.number().int().min(0).optional()
});

// Образование
const educationSchema = z.object({
  institution: z.string(),
  degree: z.string(),
  specialty: z.string(),
  start_year: z.number().int().min(1900).max(2100),
  end_year: z.number().int().min(1900).max(2100).optional(),
  gpa: z.number().min(0).max(5).optional(),
  diploma_url: urlSchema,
  description: z.string().max(500).optional()
});

// Сертификаты
const certificationSchema = z.object({
  name: z.string(),
  organization: z.string(),
  issue_date: dateSchema,
  expiry_date: dateSchema.optional(),
  certificate_id: z.string().optional(),
  certificate_url: urlSchema,
  skills: z.array(z.string()).optional()
});

// Достижения
const achievementSchema = z.object({
  name: z.string(),
  initial_value: z.number(),
  final_value: z.number(),
  uom: z.enum(['day', 'percent', 'users', 'revenue', 'other']).optional(),
  type: z.enum(['increased', 'decreased', 'implemented', 'optimized']).optional(),
  description: z.string().optional()
});

// Проекты
const projectSchema = z.object({
  id: uuidSchema,
  name: z.string(),
  description: z.string(),
  type: z.enum(['commercial', 'pet', 'open_source', 'hackathon', 'learning']),
  role: z.string(),
  start_date: dateSchema,
  end_date: dateSchema.optional(),
  technologies: z.array(z.string()),
  achievements: z.array(z.object({
    name: z.string(),
    description: z.string(),
    impact: z.string().optional()
  })).default([]),
  links: z.object({
    github: urlSchema,
    demo: urlSchema,
    website: urlSchema
  }).optional(),
  visibility: z.enum(['public', 'employers_only', 'private', 'ai_only']).default('public'),
  files: z.array(z.object({
    name: z.string(),
    type: z.string(),
    size: z.number().int(),
    url: z.string().url()
  })).optional(),
  import_source: z.object({
    type: z.enum(['github', 'gitlab', 'local']),
    url: urlSchema.optional(),
    imported_at: z.string().datetime()
  }).optional()
});

// Опыт работы
const experienceSchema = z.object({
  id: uuidSchema,
  company: z.string(),
  position: z.string(),
  start_date: dateSchema,
  end_date: dateSchema.optional(),
  current: z.boolean().default(false),
  employment_type: z.enum(['full-time', 'part-time', 'contract', 'freelance']),
  location: z.string().optional(),
  remote: z.boolean().optional(),
  description: z.string().max(500).optional(),
  tasks: z.array(z.string()),
  stack: z.array(z.string()),
  achievements: z.array(achievementSchema).default([]),
  projects: z.array(uuidSchema).optional()
});

// Волонтерство
const volunteeringSchema = z.object({
  organization: z.string(),
  role: z.string(),
  start_date: dateSchema,
  end_date: dateSchema.optional(),
  description: z.string()
});

// Публикации
const publicationSchema = z.object({
  title: z.string(),
  type: z.enum(['article', 'conference', 'book', 'blog']),
  date: dateSchema,
  url: urlSchema.optional(),
  description: z.string().optional()
});

// План обучения
const learningPlanSchema = z.object({
  current_level: z.string(),
  target_level: z.string(),
  target_date: dateSchema,
  skills_to_improve: z.array(z.object({
    skill_id: z.string(),
    current_level: z.number().int().min(1).max(10),
    target_level: z.number().int().min(1).max(10),
    resources: z.array(z.string()).optional(),
    projects: z.array(z.string()).optional()
  })),
  courses: z.array(z.object({
    name: z.string(),
    provider: z.string(),
    status: z.enum(['planned', 'in_progress', 'completed']),
    completion_date: dateSchema.optional()
  })).optional(),
  milestones: z.array(z.object({
    name: z.string(),
    description: z.string(),
    target_date: dateSchema,
    status: z.enum(['pending', 'in_progress', 'completed', 'delayed'])
  })).optional()
});

// Настройки
const preferencesSchema = z.object({
  job_alerts: z.boolean().default(true),
  profile_views: z.boolean().default(true),
  messages: z.boolean().default(true),
  learning_recommendations: z.boolean().default(true),
  visibility: z.enum(['public', 'recruiters_only', 'private']).default('recruiters_only'),
  show_salary: z.boolean().default(false),
  available_for_work: z.boolean().default(true)
});

// Аналитика
const analyticsSchema = z.object({
  profile_views: z.number().int().min(0),
  job_applications: z.number().int().min(0),
  messages_received: z.number().int().min(0),
  interview_invitations: z.number().int().min(0),
  last_updated: z.string().datetime(),
  completeness_score: z.number().int().min(0).max(100)
});

// Метаданные
const metadataSchema = z.object({
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
  profile_type: z.enum(['main', 'specialized', 'anonymous', 'export']).default('main'),
  version: z.number().int(),
  ai_enhanced: z.boolean().default(false)
});

// Основная схема профиля
const personSchema = z.object({
  person: z.object({
    // Основная информация
    name: z.string(),
    gender: z.enum(['male', 'female', 'unknown']),
    avatar: urlSchema,
    birth_date: dateSchema,
    
    // Карьерные цели
    desiredPositions: z.array(z.string()),
    salary_expectations: z.object({
      min: z.number().int().min(0),
      max: z.number().int().min(0),
      currency: z.enum(['RUB', 'USD', 'EUR', 'KZT']).default('RUB')
    }).optional(),
    employment_types: z.array(z.enum(['full-time', 'part-time', 'contract', 'freelance', 'internship'])),
    work_formats: z.array(z.enum(['office', 'remote', 'hybrid'])),
    notice_period: z.number().int().min(0).max(90).default(14),
    career_level: z.enum(['trainee', 'junior', 'middle', 'senior', 'lead', 'head']),
    
    // Контакты и локация
    contact: contactSchema,
    location: locationSchema,
    
    // Описание
    summary: z.string().max(500).optional(),
    about: z.string().max(2000).optional(),
    
    // Навыки и знания
    languages: z.array(languageSchema),
    skills: z.array(skillSchema),
    soft_skills: z.array(z.string()).optional(),
    
    // Образование
    education: z.array(educationSchema),
    certifications: z.array(certificationSchema).optional(),
    
    // Проекты и опыт
    projects: z.array(projectSchema).optional(),
    experience: z.array(experienceSchema),
    
    // Дополнительная информация
    hobby: z.array(z.string()).optional(),
    literature: z.array(z.string()).optional(),
    volunteering: z.array(volunteeringSchema).optional(),
    publications: z.array(publicationSchema).optional(),
    
    // Обучение и развитие
    learning_plan: learningPlanSchema.optional(),
    
    // Настройки
    preferences: preferencesSchema.optional(),
    
    // Аналитика
    analytics: analyticsSchema.optional(),
    
    // Метаданные
    metadata: metadataSchema.optional()
  })
});

// Типы
type Contact = z.infer<typeof contactSchema>;
type Location = z.infer<typeof locationSchema>;
type Language = z.infer<typeof languageSchema>;
type Skill = z.infer<typeof skillSchema>;
type Education = z.infer<typeof educationSchema>;
type Certification = z.infer<typeof certificationSchema>;
type Achievement = z.infer<typeof achievementSchema>;
type Project = z.infer<typeof projectSchema>;
type Experience = z.infer<typeof experienceSchema>;
type Volunteering = z.infer<typeof volunteeringSchema>;
type Publication = z.infer<typeof publicationSchema>;
type LearningPlan = z.infer<typeof learningPlanSchema>;
type Preferences = z.infer<typeof preferencesSchema>;
type Analytics = z.infer<typeof analyticsSchema>;
type Metadata = z.infer<typeof metadataSchema>;
type Person = z.infer<typeof personSchema>['person'];
type PersonSchema = z.infer<typeof personSchema>;

export {
  personSchema,
  contactSchema,
  locationSchema,
  languageSchema,
  skillSchema,
  educationSchema,
  certificationSchema,
  achievementSchema,
  projectSchema,
  experienceSchema,
  volunteeringSchema,
  publicationSchema,
  learningPlanSchema,
  preferencesSchema,
  analyticsSchema,
  metadataSchema,
  
  // Типы
  type Person,
  type PersonSchema,
  type Contact,
  type Location,
  type Language,
  type Skill,
  type Education,
  type Certification,
  type Achievement,
  type Project,
  type Experience,
  type Volunteering,
  type Publication,
  type LearningPlan,
  type Preferences,
  type Analytics,
  type Metadata
};