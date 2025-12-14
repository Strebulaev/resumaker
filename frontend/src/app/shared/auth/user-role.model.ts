export enum UserRole {
  APPLICANT = 'applicant',
  EMPLOYER = 'employer',
  ADMIN = 'admin'
}

export interface UserProfile {
  id: string;
  email: string;
  role: UserRole;
  firstName?: string;
  lastName?: string;
  companyName?: string;
  phone?: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
  // Интеграции с платформами
  hhToken?: string;
  superJobToken?: string;
  hhEmployerId?: string;
  superJobClientId?: string;
}