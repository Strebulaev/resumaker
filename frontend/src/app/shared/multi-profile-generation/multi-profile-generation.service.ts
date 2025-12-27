import { Injectable } from '@angular/core';
import { SupabaseService } from '../db/supabase.service';
import { AIService } from '../ai/ai.service';
import { ProfileService } from '../profile/profile.service';
import {
  MultiProfileResume,
  CoverLetterGeneration,
  GenerationRequest,
  OptimizationResult,
  ResumeContent,
  ExperienceEntry,
  ProjectEntry,
  SkillEntry,
  ResumeSectionType,
  GenerationEmphasis,
  ResumeLength,
  ResumeTone,
  SkillLevel
} from './multi-profile-generation.models';

@Injectable({
  providedIn: 'root'
})
export class MultiProfileGenerationService {
  constructor(
    private supabaseService: SupabaseService,
    private aiService: AIService,
    private profileService: ProfileService
  ) {}

  async generateMultiProfileResume(request: GenerationRequest): Promise<MultiProfileResume> {
    const profiles = await this.loadProfiles(request.profiles);
    const contributions = await this.calculateProfileContributions(profiles, request);
    const content = await this.buildResumeContent(profiles, contributions, request);

    const resume: MultiProfileResume = {
      id: this.generateId(),
      userId: await this.getCurrentUserId(),
      title: `Резюме для позиции ${request.targetPosition}`,
      profiles: contributions,
      content,
      targetPosition: request.targetPosition,
      generatedAt: new Date(),
      version: 1
    };

    await this.saveResume(resume);
    return resume;
  }

  async generateCoverLetter(resumeId: string, vacancyId: string): Promise<CoverLetterGeneration> {
    const resume = await this.getResume(resumeId);
    const vacancy = await this.getVacancy(vacancyId);

    const content = await this.buildCoverLetterContent(resume, vacancy);

    const coverLetter: CoverLetterGeneration = {
      id: this.generateId(),
      userId: await this.getCurrentUserId(),
      resumeId,
      vacancyId,
      content,
      generatedAt: new Date(),
      version: 1
    };

    await this.saveCoverLetter(coverLetter);
    return coverLetter;
  }

  async optimizeResumeForVacancy(resumeId: string, vacancyDescription: string): Promise<OptimizationResult> {
    const originalResume = await this.getResume(resumeId);

    const prompt = `Optimize this resume for the following job description:

Job Description:
${vacancyDescription}

Original Resume:
${JSON.stringify(originalResume.content, null, 2)}

Please provide:
1. Optimized resume content
2. List of changes made
3. Keywords that match the job
4. ATS compatibility score (0-100)
5. Readability score (0-100)

Format as JSON with keys: optimizedContent, changes, keywordMatches, atsScore, readabilityScore`;

    const request = {
      model: 'meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo',
      prompt,
      max_tokens: 2000,
      temperature: 0.3,
      top_p: 0.9
    };

    const response = await this.aiService.generateText(request).toPromise();
    const optimization = JSON.parse(response || '{}');

    const optimizedResume: MultiProfileResume = {
      ...originalResume,
      content: optimization.optimizedContent,
      version: originalResume.version + 1
    };

    return {
      originalResume,
      optimizedResume,
      changes: optimization.changes || [],
      keywordMatches: optimization.keywordMatches || [],
      atsScore: optimization.atsScore || 0,
      readabilityScore: optimization.readabilityScore || 0
    };
  }

  async exportResume(resumeId: string, format: string, template?: string): Promise<Blob> {
    const resume = await this.getResume(resumeId);

    switch (format.toLowerCase()) {
      case 'pdf':
        return this.exportAsPDF(resume, template);
      case 'docx':
        return this.exportAsDOCX(resume, template);
      case 'html':
        return this.exportAsHTML(resume, template);
      case 'json':
        return new Blob([JSON.stringify(resume, null, 2)], { type: 'application/json' });
      case 'txt':
        return this.exportAsTXT(resume);
      default:
        throw new Error(`Unsupported format: ${format}`);
    }
  }

  private async loadProfiles(profileIds: string[]): Promise<any[]> {
    const profiles = [];
    for (const id of profileIds) {
      const profile = await this.profileService.getProfile(id);
      if (profile) profiles.push(profile);
    }
    return profiles;
  }

  private async calculateProfileContributions(profiles: any[], request: GenerationRequest): Promise<any[]> {
    const contributions = [];

    for (const profile of profiles) {
      const relevanceScore = await this.calculateProfileRelevance(profile, request);
      const sections = await this.extractRelevantSections(profile, request);

      contributions.push({
        profileId: profile.id,
        profileName: profile.name,
        weight: relevanceScore,
        sections
      });
    }

    return contributions.sort((a, b) => b.weight - a.weight);
  }

  private async calculateProfileRelevance(profile: any, request: GenerationRequest): Promise<number> {
    let score = 0;

    const positionKeywords = request.targetPosition.toLowerCase().split(' ');
    const profileSkills = profile.skills?.map((s: any) => s.name.toLowerCase()) || [];
    const profileExperience = profile.experience || [];

    score += positionKeywords.filter(keyword =>
      profileSkills.some((skill: string) => skill.includes(keyword))
    ).length * 20;

    score += profileExperience.filter((exp: any) =>
      exp.position?.toLowerCase().includes(request.targetPosition.toLowerCase().split(' ')[0])
    ).length * 15;

    if (request.emphasis.includes(GenerationEmphasis.TECHNICAL_SKILLS)) {
      score += profileSkills.length * 5;
    }

    if (request.emphasis.includes(GenerationEmphasis.PROJECTS)) {
      score += (profile.projects?.length || 0) * 10;
    }

    return Math.min(score, 100);
  }

  private async extractRelevantSections(profile: any, request: GenerationRequest): Promise<any[]> {
    const sections = [];

    if (profile.experience) {
      sections.push({
        sectionType: ResumeSectionType.EXPERIENCE,
        content: profile.experience,
        sourceProfile: profile.id,
        relevanceScore: 90
      });
    }

    if (profile.projects) {
      sections.push({
        sectionType: ResumeSectionType.PROJECTS,
        content: profile.projects,
        sourceProfile: profile.id,
        relevanceScore: 85
      });
    }

    if (profile.skills) {
      sections.push({
        sectionType: ResumeSectionType.SKILLS,
        content: profile.skills,
        sourceProfile: profile.id,
        relevanceScore: 80
      });
    }

    return sections;
  }

  private async buildResumeContent(profiles: any[], contributions: any[], request: GenerationRequest): Promise<ResumeContent> {
    const content: ResumeContent = {
      summary: '',
      experience: [],
      projects: [],
      skills: [],
      education: [],
      certifications: [],
      languages: [],
      customSections: []
    };

    for (const contribution of contributions) {
      const profile = profiles.find(p => p.id === contribution.profileId);
      if (!profile) continue;

      content.experience.push(...this.transformExperience(profile.experience || [], contribution.profileId));
      content.projects.push(...this.transformProjects(profile.projects || [], contribution.profileId));
      content.skills.push(...this.transformSkills(profile.skills || [], contribution.profileId));
      content.education.push(...this.transformEducation(profile.education || [], contribution.profileId));
      content.certifications.push(...this.transformCertifications(profile.certifications || [], contribution.profileId));
      content.languages.push(...this.transformLanguages(profile.languages || [], contribution.profileId));
    }

    content.summary = await this.generateSummary(content, request);
    content.experience = this.deduplicateAndSort(content.experience);
    content.projects = this.deduplicateAndSort(content.projects);
    content.skills = this.mergeAndRankSkills(content.skills);

    return content;
  }

  private transformExperience(experience: any[], profileId: string): ExperienceEntry[] {
    return experience.map(exp => ({
      id: this.generateId(),
      company: exp.company || '',
      position: exp.position || '',
      startDate: exp.startDate || '',
      endDate: exp.endDate,
      description: exp.description || '',
      achievements: exp.achievements || [],
      technologies: exp.technologies || [],
      sourceProfile: profileId,
      relevanceScore: 85
    }));
  }

  private transformProjects(projects: any[], profileId: string): ProjectEntry[] {
    return projects.map(project => ({
      id: this.generateId(),
      name: project.name || '',
      description: project.description || '',
      technologies: project.technologies || [],
      role: project.role || '',
      startDate: project.startDate || '',
      endDate: project.endDate,
      achievements: project.achievements || [],
      url: project.url,
      sourceProfile: profileId,
      relevanceScore: 80
    }));
  }

  private transformSkills(skills: any[], profileId: string): SkillEntry[] {
    return skills.map(skill => ({
      name: skill.name || '',
      level: this.mapSkillLevel(skill.level),
      yearsOfExperience: skill.yearsOfExperience || 0,
      category: skill.category || '',
      endorsements: skill.endorsements || 0,
      sourceProfiles: [profileId]
    }));
  }

  private mapSkillLevel(level: string): SkillLevel {
    const levelMap = {
      'beginner': SkillLevel.BEGINNER,
      'intermediate': SkillLevel.INTERMEDIATE,
      'advanced': SkillLevel.ADVANCED,
      'expert': SkillLevel.EXPERT
    };
    return levelMap[level as keyof typeof levelMap] || SkillLevel.INTERMEDIATE;
  }

  private transformEducation(education: any[], profileId: string): any[] {
    return education.map(edu => ({
      ...edu,
      sourceProfile: profileId
    }));
  }

  private transformCertifications(certifications: any[], profileId: string): any[] {
    return certifications.map(cert => ({
      ...cert,
      sourceProfile: profileId
    }));
  }

  private transformLanguages(languages: any[], profileId: string): any[] {
    return languages.map(lang => ({
      ...lang,
      sourceProfile: profileId
    }));
  }

  private async generateSummary(content: ResumeContent, request: GenerationRequest): Promise<string> {
    const prompt = `Generate a professional summary for a resume targeting the position "${request.targetPosition}".

Key information:
- Experience: ${content.experience.length} positions
- Projects: ${content.projects.length} projects
- Top skills: ${content.skills.slice(0, 5).map(s => s.name).join(', ')}
- Tone: ${request.tone}
- Length: ${request.length}

Write a compelling 3-4 sentence professional summary.`;

    const aiRequest = {
      model: 'meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo',
      prompt,
      max_tokens: 200,
      temperature: 0.7,
      top_p: 0.9
    };

    const response = await this.aiService.generateText(aiRequest).toPromise();
    return response || '';
  }

  private deduplicateAndSort(items: any[]): any[] {
    const seen = new Set();
    return items
      .filter(item => {
        const key = item.id || item.name || item.company;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      })
      .sort((a, b) => (b.relevanceScore || 0) - (a.relevanceScore || 0));
  }

  private mergeAndRankSkills(skills: SkillEntry[]): SkillEntry[] {
    const skillMap = new Map<string, SkillEntry>();

    skills.forEach(skill => {
      const existing = skillMap.get(skill.name);
      if (existing) {
        existing.yearsOfExperience = Math.max(existing.yearsOfExperience, skill.yearsOfExperience);
        existing.endorsements += skill.endorsements;
        existing.sourceProfiles.push(...skill.sourceProfiles);
        existing.level = this.getHigherSkillLevel(existing.level, skill.level);
      } else {
        skillMap.set(skill.name, { ...skill });
      }
    });

    return Array.from(skillMap.values())
      .sort((a, b) => b.yearsOfExperience - a.yearsOfExperience);
  }

  private getHigherSkillLevel(level1: SkillLevel, level2: SkillLevel): SkillLevel {
    const levels = [SkillLevel.BEGINNER, SkillLevel.INTERMEDIATE, SkillLevel.ADVANCED, SkillLevel.EXPERT];
    const index1 = levels.indexOf(level1);
    const index2 = levels.indexOf(level2);
    return levels[Math.max(index1, index2)];
  }

  private async buildCoverLetterContent(resume: MultiProfileResume, vacancy: any): Promise<any> {
    const prompt = `Generate a professional cover letter for this job application.

Job: ${vacancy.title} at ${vacancy.company}
Job Description: ${vacancy.description}

Candidate Summary: ${resume.content.summary}

Key Experience: ${resume.content.experience.slice(0, 2).map(e => e.position + ' at ' + e.company).join(', ')}

Write a compelling cover letter with:
1. Professional greeting
2. Strong introduction
3. 2-3 body paragraphs highlighting relevant experience
4. Strong conclusion
5. Professional sign-off

Keep it concise and impactful.`;

    const aiRequest = {
      model: 'meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo',
      prompt,
      max_tokens: 600,
      temperature: 0.7,
      top_p: 0.9
    };

    const response = await this.aiService.generateText(aiRequest).toPromise();
    const content = response || '';

    return {
      greeting: 'Уважаемый работодатель,',
      introduction: content.split('\n')[0] || '',
      body: content.split('\n').slice(1, -2) || [],
      conclusion: content.split('\n').slice(-2, -1)[0] || '',
      signOff: 'С уважением,',
      contactInfo: {
        name: 'Имя кандидата',
        email: 'email@example.com'
      }
    };
  }

  private async exportAsPDF(resume: MultiProfileResume, template?: string): Promise<Blob> {
    const html = await this.generateResumeHTML(resume, template);
    return new Blob([html], { type: 'text/html' });
  }

  private async exportAsDOCX(resume: MultiProfileResume, template?: string): Promise<Blob> {
    const html = await this.generateResumeHTML(resume, template);
    return new Blob([html], { type: 'text/html' });
  }

  private async exportAsHTML(resume: MultiProfileResume, template?: string): Promise<Blob> {
    const html = await this.generateResumeHTML(resume, template);
    return new Blob([html], { type: 'text/html' });
  }

  private exportAsTXT(resume: MultiProfileResume): Blob {
    let text = `${resume.title}\n\n`;

    if (resume.content.summary) {
      text += `Summary\n${resume.content.summary}\n\n`;
    }

    if (resume.content.experience.length > 0) {
      text += `Experience\n`;
      resume.content.experience.forEach(exp => {
        text += `${exp.position} at ${exp.company}\n`;
        text += `${exp.startDate} - ${exp.endDate || 'Present'}\n`;
        text += `${exp.description}\n\n`;
      });
    }

    return new Blob([text], { type: 'text/plain' });
  }

  private async generateResumeHTML(resume: MultiProfileResume, template?: string): Promise<string> {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${resume.title}</title>
        <style>
          body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
          h1 { color: #333; border-bottom: 2px solid #3b82f6; padding-bottom: 10px; }
          h2 { color: #555; margin-top: 30px; }
          .summary { background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0; }
          .experience-item, .project-item { margin-bottom: 20px; }
          .skills { display: flex; flex-wrap: wrap; gap: 10px; }
          .skill { background: #e3f2fd; padding: 5px 10px; border-radius: 15px; }
        </style>
      </head>
      <body>
        <h1>${resume.title}</h1>

        ${resume.content.summary ? `<div class="summary">${resume.content.summary}</div>` : ''}

        ${resume.content.experience.length > 0 ? `
          <h2>Опыт работы</h2>
          ${resume.content.experience.map(exp => `
            <div class="experience-item">
              <h3>${exp.position} - ${exp.company}</h3>
              <p>${exp.startDate} - ${exp.endDate || 'настоящее время'}</p>
              <p>${exp.description}</p>
              ${exp.achievements.length > 0 ? `<ul>${exp.achievements.map(a => `<li>${a}</li>`).join('')}</ul>` : ''}
            </div>
          `).join('')}
        ` : ''}

        ${resume.content.projects.length > 0 ? `
          <h2>Проекты</h2>
          ${resume.content.projects.map(project => `
            <div class="project-item">
              <h3>${project.name}</h3>
              <p>${project.description}</p>
              <p><strong>Роль:</strong> ${project.role}</p>
              <p><strong>Технологии:</strong> ${project.technologies.join(', ')}</p>
            </div>
          `).join('')}
        ` : ''}

        ${resume.content.skills.length > 0 ? `
          <h2>Навыки</h2>
          <div class="skills">
            ${resume.content.skills.map(skill => `<span class="skill">${skill.name} (${skill.level})</span>`).join('')}
          </div>
        ` : ''}
      </body>
      </html>
    `;
  }

  private async saveResume(resume: MultiProfileResume): Promise<void> {
    const { error } = await this.supabaseService.client
      .from('multi_profile_resumes')
      .insert(resume);

    if (error) throw error;
  }

  private async saveCoverLetter(coverLetter: CoverLetterGeneration): Promise<void> {
    const { error } = await this.supabaseService.client
      .from('cover_letter_generations')
      .insert(coverLetter);

    if (error) throw error;
  }

  private async getResume(resumeId: string): Promise<MultiProfileResume> {
    const { data, error } = await this.supabaseService.client
      .from('multi_profile_resumes')
      .select('*')
      .eq('id', resumeId)
      .single();

    if (error) throw error;
    return data;
  }

  private async getVacancy(vacancyId: string): Promise<any> {
    const { data, error } = await this.supabaseService.client
      .from('vacancies')
      .select('*')
      .eq('id', vacancyId)
      .single();

    if (error) throw error;
    return data;
  }

  private async getCurrentUserId(): Promise<string> {
    const user = this.supabaseService.currentUser;
    return user?.id || '';
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }
}