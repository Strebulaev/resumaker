import { z } from 'zod';

// Валидаторы на основе вашего JSON Schema
const phoneSchema = z.string().regex(/^\+[0-9]{11}$/).optional();
const emailSchema = z.string().email();
const languageLevelSchema = z.string().regex(/^[A-C][1-2]$/);
const dateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/); // YYYY-MM-DD

const contactSchema = z.object({
  phone: phoneSchema,
  email: emailSchema,
}).catchall(z.string().url().optional().or(z.literal('')));

const locationSchema = z.object({
  country: z.string().optional(),
  city: z.string(),
  relocation: z.boolean(),
  remote: z.boolean(),
  business_trips: z.boolean(),
});

const languageSchema = z.object({
  language: z.string(),
  level: languageLevelSchema,
});

const skillSchema = z.object({
  area: z.string(),
  name: z.string(),
  level: z.number().int().min(1).max(10),
  date: dateSchema, // Строка в формате YYYY-MM-DD
});

const educationSchema = z.object({
  institution: z.string(),
  degree: z.string(),
  specialty: z.string(),
  year: z.number().int(),
});

const achievementSchema = z.object({
  name: z.string(),
  initial_value: z.number(),
  final_value: z.number(),
  uom: z.enum(['day', 'percent']).optional(),
  type: z.enum(['increased', 'decreased']).optional(),
});

const experienceSchema = z.object({
  company: z.string(),
  position: z.string(),
  startDate: dateSchema, // Используем startDate вместо from-date
  endDate: dateSchema.optional().nullable(), // Используем endDate вместо to-date
  tasks: z.array(z.string()),
  stack: z.array(z.string()),
  achievements: z.array(achievementSchema),
});

const personSchema = z.object({
  person: z.object({
    name: z.string(),
    gender: z.enum(['male', 'female', 'unknown']),
    desiredPositions: z.array(z.string()).optional(),
    contact: contactSchema,
    location: locationSchema,
    languages: z.array(languageSchema),
    skills: z.array(skillSchema),
    education: z.array(educationSchema),
    hobby: z.array(z.string()).optional(),
    literature: z.array(z.string()).optional(),
    experience: z.array(experienceSchema),
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