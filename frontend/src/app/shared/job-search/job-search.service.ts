import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Person } from '../../person-schema';

export interface JobVacancy {
  id: string;
  title: string;
  company: string;
  location: string;
  salary?: {
    from?: number;
    to?: number;
    currency: string;
  };
  experience?: string;
  employment?: string;
  schedule?: string;
  description: string;
  url: string;
  publishedAt: string;
  source: 'hh.ru' | 'superjob.ru';
  matchScore?: number;
}

export interface JobSearchParams {
  text?: string;
  keyword?: string;
  area?: string;
  town?: string;
  experience?: string;
  employment?: string;
  schedule?: string;
  type_of_work?: string;
  place_of_work?: string;
  salary?: number;
  payment_from?: number;
}

export interface JobApplication {
  vacancyId: string;
  resumeId: string;
  status: 'applied' | 'pending' | 'rejected' | 'accepted';
  appliedAt: string;
  platform: 'hh.ru' | 'superjob.ru';
  coverLetter?: string;
}

@Injectable({
  providedIn: 'root'
})
export class JobSearchService {
  private apiUrl = '/api';

  constructor(private http: HttpClient) {}

  // Search jobs on HH.ru
  searchHHJobs(params: JobSearchParams, accessToken?: string): Observable<JobVacancy[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<{ success: boolean; vacancies: JobVacancy[]; total: number }>(
      `${this.apiUrl}/hh/search`,
      { searchParams: params, accessToken, userId: 'current-user' },
      { headers }
    ).pipe(
      map(response => response.success ? response.vacancies : []),
      catchError(error => {
        console.error('HH.ru search error:', error);
        return of([]);
      })
    );
  }

  // Search jobs on SuperJob
  searchSJJobs(params: JobSearchParams, accessToken?: string): Observable<JobVacancy[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<{ success: boolean; vacancies: JobVacancy[]; total: number }>(
      `${this.apiUrl}/superjob/search`,
      { searchParams: params, accessToken, userId: 'current-user' },
      { headers }
    ).pipe(
      map(response => response.success ? response.vacancies : []),
      catchError(error => {
        console.error('SuperJob search error:', error);
        return of([]);
      })
    );
  }

  // Search jobs on all platforms
  searchAllJobs(params: JobSearchParams, tokens?: { hh?: string; sj?: string }): Observable<JobVacancy[]> {
    const hhSearch = this.searchHHJobs(params, tokens?.hh);
    const sjSearch = this.searchSJJobs(params, tokens?.sj);

    return forkJoin([hhSearch, sjSearch]).pipe(
      map(([hhJobs, sjJobs]) => {
        const allJobs = [...hhJobs, ...sjJobs];
        return this.rankJobsByRelevance(allJobs, params);
      }),
      catchError(error => {
        console.error('Combined search error:', error);
        return of([]);
      })
    );
  }

  // Apply to job on HH.ru
  applyToHHJob(vacancyId: string, resumeData: any, accessToken: string): Observable<JobApplication> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<{ success: boolean; application: JobApplication }>(
      `${this.apiUrl}/hh/apply`,
      { vacancyId, resumeData, accessToken, userId: 'current-user' },
      { headers }
    ).pipe(
      map(response => response.application),
      catchError(error => {
        console.error('HH.ru apply error:', error);
        throw error;
      })
    );
  }

  // Apply to job on SuperJob
  applyToSJJob(vacancyId: string, resumeData: any, accessToken: string): Observable<JobApplication> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<{ success: boolean; application: JobApplication }>(
      `${this.apiUrl}/superjob/apply`,
      { vacancyId, resumeData, accessToken, userId: 'current-user' },
      { headers }
    ).pipe(
      map(response => response.application),
      catchError(error => {
        console.error('SuperJob apply error:', error);
        throw error;
      })
    );
  }

  // Auto-apply to multiple jobs
  autoApplyToJobs(vacancies: JobVacancy[], profile: Person, tokens: { hh?: string; sj?: string }): Observable<JobApplication[]> {
    const applications: Observable<JobApplication>[] = [];

    for (const vacancy of vacancies) {
      const resumeData = this.prepareResumeDataForPlatform(profile, vacancy.source);

      if (vacancy.source === 'hh.ru' && tokens.hh) {
        applications.push(this.applyToHHJob(vacancy.id, resumeData, tokens.hh));
      } else if (vacancy.source === 'superjob.ru' && tokens.sj) {
        applications.push(this.applyToSJJob(vacancy.id, resumeData, tokens.sj));
      }
    }

    return forkJoin(applications).pipe(
      catchError(error => {
        console.error('Auto-apply error:', error);
        return of([]);
      })
    );
  }

  // Rank jobs by relevance to user profile
  private rankJobsByRelevance(jobs: JobVacancy[], searchParams: JobSearchParams): JobVacancy[] {
    return jobs.map(job => ({
      ...job,
      matchScore: this.calculateMatchScore(job, searchParams)
    })).sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
  }

  // Calculate match score based on various factors
  private calculateMatchScore(job: JobVacancy, params: JobSearchParams): number {
    let score = 0;

    // Text relevance (simplified - in production use NLP)
    if (params.text && job.title.toLowerCase().includes(params.text.toLowerCase())) {
      score += 30;
    }

    if (params.text && job.description.toLowerCase().includes(params.text.toLowerCase())) {
      score += 20;
    }

    // Salary match
    if (job.salary && params.salary) {
      if (job.salary.from && job.salary.from <= params.salary) {
        score += 15;
      }
    }

    // Location match
    if (params.area && job.location.includes(params.area)) {
      score += 10;
    }

    // Experience match
    if (params.experience && job.experience === params.experience) {
      score += 10;
    }

    // Employment type match
    if (params.employment && job.employment === params.employment) {
      score += 10;
    }

    return Math.min(score, 100);
  }

  // Prepare resume data for specific platform
  private prepareResumeDataForPlatform(profile: Person, platform: string): any {
    const baseData = {
      position: profile.desiredPositions?.[0] || 'Разработчик',
      salary: profile.salary_expectations?.max || profile.salary_expectations?.min,
      area: this.getAreaId(profile.location.city, platform),
      education: profile.education?.map(edu => ({
        institution: edu.institution,
        degree: edu.degree,
        specialty: edu.specialty,
        start_year: edu.start_year,
        end_year: edu.end_year
      })),
      experience: profile.experience?.map(exp => ({
        company: exp.company,
        position: exp.position,
        start_date: exp.start_date,
        end_date: exp.end_date,
        description: exp.description,
        tasks: exp.tasks,
        stack: exp.stack
      })),
      skills: profile.skills?.map(skill => skill.name),
      languages: profile.languages?.map(lang => ({
        language: lang.language,
        level: lang.level
      })),
      contacts: [{
        type: 'email',
        value: profile.contact.email
      }, {
        type: 'phone',
        value: profile.contact.phone
      }],
      about: profile.about || profile.summary
    };

    return baseData;
  }

  // Convert city name to platform-specific area ID
  private getAreaId(city: string, platform: string): string | number {
    // Simplified mapping - in production use proper geocoding
    const cityMappings: { [key: string]: { hh: string; sj: number } } = {
      'Москва': { hh: '1', sj: 4 },
      'Санкт-Петербург': { hh: '2', sj: 14 },
      'Екатеринбург': { hh: '3', sj: 47 },
      'Новосибирск': { hh: '4', sj: 65 },
      'Казань': { hh: '88', sj: 108 }
    };

    const mapping = cityMappings[city];
    if (mapping) {
      return platform === 'hh.ru' ? mapping.hh : mapping.sj;
    }

    // Default to Moscow
    return platform === 'hh.ru' ? '1' : 4;
  }

  // Get search parameters from user profile
  getSearchParamsFromProfile(profile: Person): JobSearchParams {
    return {
      text: profile.desiredPositions?.join(' ') || 'разработчик',
      area: this.getAreaId(profile.location.city, 'hh') as string,
      town: this.getAreaId(profile.location.city, 'sj') as string,
      experience: this.getExperienceLevel(profile),
      employment: profile.employment_types?.[0],
      salary: profile.salary_expectations?.min
    };
  }

  // Convert experience to platform format
  private getExperienceLevel(profile: Person): string {
    const totalExperience = this.calculateTotalExperience(profile);

    if (totalExperience < 1) return 'noExperience';
    if (totalExperience < 3) return 'between1And3';
    if (totalExperience < 6) return 'between3And6';
    return 'moreThan6';
  }

  // Calculate total years of experience
  private calculateTotalExperience(profile: Person): number {
    if (!profile.experience) return 0;

    let totalMonths = 0;

    for (const exp of profile.experience) {
      if (!exp.start_date) continue;

      const start = new Date(exp.start_date);
      const end = exp.end_date ? new Date(exp.end_date) : new Date();

      const months = (end.getFullYear() - start.getFullYear()) * 12 +
                    (end.getMonth() - start.getMonth());

      totalMonths += months;
    }

    return totalMonths / 12;
  }
}