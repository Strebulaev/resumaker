import { z } from 'zod';

// Валидаторы на основе вашего JSON Schema
const phoneSchema = z.string().regex(/^\+[0-9]{11}$/).optional().or(z.literal(''));
const emailSchema = z.string().email();
const languageLevelSchema = z.enum(['A1', 'A2', 'B1', 'B2', 'C1', 'C2']);
const dateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(); // YYYY-MM-DD

const contactSchema = z.object({
  phone: phoneSchema,
  email: emailSchema,
  linkedin: z.string().url().optional().or(z.literal('')),
  github: z.string().url().optional().or(z.literal('')),
  telegram: z.string().optional().or(z.literal(''))
});


const locationSchema = z.object({
  country: z.string().optional().or(z.literal('')),
  city: z.string(),
  relocation: z.boolean().default(false),
  remote: z.boolean().default(false),
  business_trips: z.boolean().default(false),
});

const languageSchema = z.object({
  language: z.string(),
  level: languageLevelSchema,
});

const skillSchema = z.object({
  area: z.string(),
  name: z.string(),
  level: z.number().int().min(1).max(10),
  date: z.string(), // Более гибкая валидация для даты
});

const educationSchema = z.object({
  institution: z.string(),
  degree: z.string(),
  specialty: z.string(),
  year: z.number().int().min(1900).max(new Date().getFullYear()),
});

const achievementSchema = z.object({
  name: z.string(),
  initial_value: z.number(),
  final_value: z.number(),
  uom: z.string().optional().or(z.literal('')),
  type: z.string().optional().or(z.literal('')),
});

const experienceSchema = z.object({
  company: z.string(),
  position: z.string(),
  startDate: z.string(), // Более гибкая валидация
  endDate: z.string().optional().nullable(),
  tasks: z.array(z.string()).default([]),
  stack: z.array(z.string()).default([]),
  achievements: z.array(achievementSchema).default([]),
});

const personSchema = z.object({
  person: z.object({
    name: z.string(),
    gender: z.enum(['male', 'female', 'unknown']),
    desiredPositions: z.array(z.string()).default([]),
    contact: contactSchema,
    location: locationSchema,
    languages: z.array(languageSchema).default([]),
    skills: z.array(skillSchema).default([]),
    education: z.array(educationSchema).default([]),
    hobby: z.array(z.string()).default([]),
    literature: z.array(z.string()).default([]),
    experience: z.array(experienceSchema).default([]),
  }),
});

type Contact = z.infer<typeof contactSchema>;
type Location = z.infer<typeof locationSchema>;
type Language = z.infer<typeof languageSchema>;
type Skill = z.infer<typeof skillSchema>;
type Education = z.infer<typeof educationSchema>;
type Achievement = z.infer<typeof achievementSchema>;
type Experience = z.infer<typeof experienceSchema>;
type Person = z.infer<typeof personSchema>['person'];
type PersonSchema = z.infer<typeof personSchema>;

export {
  personSchema,
  contactSchema,
  locationSchema,
  languageSchema,
  skillSchema,
  educationSchema,
  experienceSchema,
  achievementSchema,
  type Person,
  type PersonSchema,
  type Contact,
  type Location,
  type Language,
  type Skill,
  type Education,
  type Experience,
  type Achievement,
};