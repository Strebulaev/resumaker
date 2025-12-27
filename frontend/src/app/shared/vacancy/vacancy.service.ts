import { Injectable } from '@angular/core';
import { SupabaseService } from '../db/supabase.service';
import { Vacancy } from '../profile/profile.models';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VacancyService {
  private vacanciesSubject = new BehaviorSubject<Vacancy[]>([]);
  public vacancies$ = this.vacanciesSubject.asObservable();

  constructor(private supabaseService: SupabaseService) {}

  async getVacancies(): Promise<Vacancy[]> {
    const user = this.supabaseService.currentUser;
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await this.supabaseService.client
      .from('vacancies')
      .select('*')
      .eq('createdBy', user.id)
      .order('createdAt', { ascending: false });

    if (error) throw error;
    const vacancies = data || [];
    this.vacanciesSubject.next(vacancies);
    return vacancies;
  }

  async getVacancy(id: string): Promise<Vacancy> {
    const { data, error } = await this.supabaseService.client
      .from('vacancies')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  async createVacancy(vacancy: Omit<Vacancy, 'id' | 'createdAt' | 'updatedAt'>): Promise<Vacancy> {
    const user = this.supabaseService.currentUser;
    if (!user) throw new Error('User not authenticated');

    const newVacancy = {
      ...vacancy,
      createdBy: user.id,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const { data, error } = await this.supabaseService.client
      .from('vacancies')
      .insert(newVacancy)
      .select()
      .single();

    if (error) throw error;

    await this.getVacancies();
    return data;
  }

  async updateVacancy(id: string, updates: Partial<Vacancy>): Promise<Vacancy> {
    const { data, error } = await this.supabaseService.client
      .from('vacancies')
      .update({ ...updates, updatedAt: new Date() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    await this.getVacancies();
    return data;
  }

  async deleteVacancy(id: string): Promise<void> {
    const { error } = await this.supabaseService.client
      .from('vacancies')
      .delete()
      .eq('id', id);

    if (error) throw error;

    await this.getVacancies();
  }

  async searchVacancies(query: string, filters?: {
    location?: string;
    salaryMin?: number;
    salaryMax?: number;
    employmentType?: string;
    level?: string;
  }): Promise<Vacancy[]> {
    let queryBuilder = this.supabaseService.client
      .from('vacancies')
      .select('*')
      .eq('status', 'active');

    if (query) {
      queryBuilder = queryBuilder.or(`title.ilike.%${query}%,description.ilike.%${query}%`);
    }

    if (filters?.location) {
      queryBuilder = queryBuilder.ilike('location.city', `%${filters.location}%`);
    }

    if (filters?.salaryMin) {
      queryBuilder = queryBuilder.gte('salary.min', filters.salaryMin);
    }

    if (filters?.salaryMax) {
      queryBuilder = queryBuilder.lte('salary.max', filters.salaryMax);
    }

    if (filters?.employmentType) {
      queryBuilder = queryBuilder.eq('employmentType', filters.employmentType);
    }

    if (filters?.level) {
      queryBuilder = queryBuilder.eq('level', filters.level);
    }

    const { data, error } = await queryBuilder.order('createdAt', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getVacanciesByCompany(companyId: string): Promise<Vacancy[]> {
    const { data, error } = await this.supabaseService.client
      .from('vacancies')
      .select('*')
      .eq('companyId', companyId)
      .order('createdAt', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async publishVacancy(id: string): Promise<Vacancy> {
    return this.updateVacancy(id, { status: 'active' as any });
  }

  async pauseVacancy(id: string): Promise<Vacancy> {
    return this.updateVacancy(id, { status: 'paused' as any });
  }

  async closeVacancy(id: string): Promise<Vacancy> {
    return this.updateVacancy(id, { status: 'closed' as any });
  }

  async duplicateVacancy(id: string): Promise<Vacancy> {
    const originalVacancy = await this.getVacancy(id);
    const { id: _, createdAt, updatedAt, ...vacancyData } = originalVacancy;

    return this.createVacancy({
      ...vacancyData,
      title: `${vacancyData.title} (Копия)`,
      status: 'draft' as any
    });
  }

  async getVacancyStats(id: string): Promise<{
    views: number;
    applications: number;
    shortlisted: number;
    interviews: number;
    offers: number;
    hires: number;
  }> {
    const vacancy = await this.getVacancy(id);

    return {
      views: vacancy.views || 0,
      applications: vacancy.applications || 0,
      shortlisted: vacancy.shortlisted || 0,
      interviews: vacancy.interviews || 0,
      offers: vacancy.offers || 0,
      hires: vacancy.hires || 0
    };
  }

  async incrementVacancyViews(id: string): Promise<void> {
    const vacancy = await this.getVacancy(id);
    await this.updateVacancy(id, { views: (vacancy.views || 0) + 1 });
  }

  async incrementVacancyApplications(id: string): Promise<void> {
    const vacancy = await this.getVacancy(id);
    await this.updateVacancy(id, { applications: (vacancy.applications || 0) + 1 });
  }

  async getVacancyWithCache(url: string): Promise<Vacancy> {
    const cacheKey = `vacancy_${btoa(url)}`;
    const cached = localStorage.getItem(cacheKey);

    if (cached) {
      const parsed = JSON.parse(cached);
      if (Date.now() - parsed.timestamp < 3600000) { // 1 hour cache
        return parsed.vacancy;
      }
    }

    const vacancy = await this.parseVacancyFromUrl(url);

    localStorage.setItem(cacheKey, JSON.stringify({
      vacancy,
      timestamp: Date.now()
    }));

    return vacancy;
  }

  private async parseVacancyFromUrl(url: string): Promise<Vacancy> {
    if (url.includes('hh.ru')) {
      return this.parseHHVacancy(url);
    } else if (url.includes('habr')) {
      return this.parseHabrVacancy(url);
    } else if (url.includes('superjob')) {
      return this.parseSuperjobVacancy(url);
    }

    throw new Error('Unsupported vacancy platform');
  }

  private async parseHHVacancy(url: string): Promise<Vacancy> {
    const vacancyId = url.split('/').pop()?.split('?')[0];
    if (!vacancyId) throw new Error('Invalid HH URL');

    const vacancy = await this.getVacancy(vacancyId);
    return vacancy;
  }

  private async parseHabrVacancy(url: string): Promise<Vacancy> {
    throw new Error('Habr vacancy parsing not implemented');
  }

  private async parseSuperjobVacancy(url: string): Promise<Vacancy> {
    throw new Error('SuperJob vacancy parsing not implemented');
  }

  getVacancyPlatform(vacancy: Vacancy): string {
    return 'unknown';
  }

  getPlatformLabel(platform: string): string {
    const labels = {
      'hh': 'HH.ru',
      'habr': 'Habr Career',
      'superjob': 'SuperJob',
      'unknown': 'Неизвестная платформа'
    };
    return labels[platform as keyof typeof labels] || platform;
  }
}