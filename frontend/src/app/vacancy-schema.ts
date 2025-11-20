import { z } from 'zod';

const employerSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  url: z.string().url().optional(),
  logo_urls: z.object({
    original: z.string().url().optional(),
  }).optional(),
});

const skillSchema = z.object({
  name: z.string(),
});

const salarySchema = z.object({
  from: z.number().nullable().optional(),
  to: z.number().nullable().optional(),
  currency: z.string().optional(),
  gross: z.boolean().optional(),
});

const addressSchema = z.object({
  city: z.string().optional(),
  street: z.string().optional(),
  building: z.string().optional(),
  lat: z.number().optional(),
  lng: z.number().optional(),
  description: z.string().optional(),
});

const professionalRoleSchema = z.object({
  id: z.string(),
  name: z.string(),
});

const vacancySchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  key_skills: z.array(skillSchema),
  employer: employerSchema,
  salary: salarySchema.optional().nullable(),
  address: addressSchema.optional().nullable(),
  area: z.object({
    id: z.string().optional(),
    name: z.string().optional()
  }).optional(),
  experience: z.object({
    id: z.string().optional(),
    name: z.string().optional()
  }).optional(),
  employment: z.object({
    id: z.string().optional(),
    name: z.string().optional()
  }).optional(),
  schedule: z.object({
    id: z.string().optional(),
    name: z.string().optional()
  }).optional(),
  professional_roles: z.array(professionalRoleSchema).optional(),
  published_at: z.string().datetime().optional(),
  alternate_url: z.string().url().optional(),
  snippet: z.object({
    requirement: z.string().optional(),
    responsibility: z.string().optional()
  }).optional(),
  platform: z.string().optional()
});

type Employer = z.infer<typeof employerSchema>;
type Skill = z.infer<typeof skillSchema>;
type Salary = z.infer<typeof salarySchema>;
type Address = z.infer<typeof addressSchema>;
type ProfessionalRole = z.infer<typeof professionalRoleSchema>;
type Vacancy = z.infer<typeof vacancySchema>;

export {
  employerSchema,
  skillSchema,
  salarySchema,
  addressSchema,
  professionalRoleSchema,
  vacancySchema,
  type Employer,
  type Skill,
  type Salary,
  type Address,
  type ProfessionalRole,
  type Vacancy,
};