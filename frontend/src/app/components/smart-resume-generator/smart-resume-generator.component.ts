import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MultiProfileGenerationService } from '../../shared/multi-profile-generation/multi-profile-generation.service';
import { ProfileService } from '../../shared/profile/profile.service';
import { VacancyService } from '../../shared/vacancy/vacancy.service';
import {
  MultiProfileResume,
  GenerationRequest,
  GenerationEmphasis,
  ResumeLength,
  ResumeTone,
  ExportFormat
} from '../../shared/multi-profile-generation/multi-profile-generation.models';
import { Profile } from '../../shared/profile/profile.models';

@Component({
  selector: 'app-smart-resume-generator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './smart-resume-generator.component.html',
  styleUrls: ['./smart-resume-generator.component.scss']
})
export class SmartResumeGeneratorComponent implements OnInit {
  profiles: Profile[] = [];
  selectedProfiles: string[] = [];
  targetPosition = '';
  vacancyDescription = '';
  companyName = '';
  selectedEmphasis: GenerationEmphasis[] = [];
  selectedLength: ResumeLength = ResumeLength.STANDARD;
  selectedTone: ResumeTone = ResumeTone.PROFESSIONAL;

  generatedResume: MultiProfileResume | null = null;
  isGenerating = false;
  showAdvanced = false;

  emphasisOptions = [
    { value: GenerationEmphasis.TECHNICAL_SKILLS, label: 'Технические навыки' },
    { value: GenerationEmphasis.LEADERSHIP, label: 'Лидерство' },
    { value: GenerationEmphasis.PROJECTS, label: 'Проекты' },
    { value: GenerationEmphasis.EDUCATION, label: 'Образование' },
    { value: GenerationEmphasis.ACHIEVEMENTS, label: 'Достижения' },
    { value: GenerationEmphasis.INDUSTRY_EXPERIENCE, label: 'Отраслевой опыт' }
  ];

  lengthOptions = [
    { value: ResumeLength.CONCISE, label: 'Краткое' },
    { value: ResumeLength.STANDARD, label: 'Стандартное' },
    { value: ResumeLength.DETAILED, label: 'Подробное' }
  ];

  toneOptions = [
    { value: ResumeTone.PROFESSIONAL, label: 'Профессиональный' },
    { value: ResumeTone.CREATIVE, label: 'Креативный' },
    { value: ResumeTone.TECHNICAL, label: 'Технический' },
    { value: ResumeTone.EXECUTIVE, label: 'Руководящий' }
  ];

  exportFormats = [
    { value: ExportFormat.PDF, label: 'PDF' },
    { value: ExportFormat.DOCX, label: 'Word' },
    { value: ExportFormat.HTML, label: 'HTML' },
    { value: ExportFormat.JSON, label: 'JSON' },
    { value: ExportFormat.TXT, label: 'Текст' }
  ];

  constructor(
    private generationService: MultiProfileGenerationService,
    private profileService: ProfileService,
    private vacancyService: VacancyService
  ) {}

  ngOnInit(): void {
    this.loadProfiles();
  }

  async loadProfiles(): Promise<void> {
    try {
      this.profiles = await this.profileService.getProfiles();
    } catch (error) {
      console.error('Error loading profiles:', error);
    }
  }

  toggleProfileSelection(profileId: string): void {
    const index = this.selectedProfiles.indexOf(profileId);
    if (index > -1) {
      this.selectedProfiles.splice(index, 1);
    } else {
      this.selectedProfiles.push(profileId);
    }
  }

  toggleEmphasis(emphasis: GenerationEmphasis): void {
    const index = this.selectedEmphasis.indexOf(emphasis);
    if (index > -1) {
      this.selectedEmphasis.splice(index, 1);
    } else {
      this.selectedEmphasis.push(emphasis);
    }
  }

  isProfileSelected(profileId: string): boolean {
    return this.selectedProfiles.includes(profileId);
  }

  isEmphasisSelected(emphasis: GenerationEmphasis): boolean {
    return this.selectedEmphasis.includes(emphasis);
  }

  async generateResume(): Promise<void> {
    if (!this.targetPosition.trim() || this.selectedProfiles.length === 0) {
      alert('Пожалуйста, выберите профили и укажите целевую позицию');
      return;
    }

    this.isGenerating = true;

    try {
      const request: GenerationRequest = {
        profiles: this.selectedProfiles,
        targetPosition: this.targetPosition,
        vacancyDescription: this.vacancyDescription,
        companyName: this.companyName,
        emphasis: this.selectedEmphasis,
        length: this.selectedLength,
        tone: this.selectedTone
      };

      this.generatedResume = await this.generationService.generateMultiProfileResume(request);
    } catch (error) {
      console.error('Error generating resume:', error);
      alert('Ошибка при генерации резюме');
    } finally {
      this.isGenerating = false;
    }
  }

  async exportResume(format: ExportFormat): Promise<void> {
    if (!this.generatedResume) return;

    try {
      const blob = await this.generationService.exportResume(this.generatedResume.id, format);
      this.downloadBlob(blob, `resume_${this.generatedResume.title}.${format}`);
    } catch (error) {
      console.error('Error exporting resume:', error);
      alert('Ошибка при экспорте резюме');
    }
  }

  async optimizeForVacancy(): Promise<void> {
    if (!this.generatedResume || !this.vacancyDescription) {
      alert('Необходимо сгенерировать резюме и указать описание вакансии');
      return;
    }

    try {
      const optimization = await this.generationService.optimizeResumeForVacancy(
        this.generatedResume.id,
        this.vacancyDescription
      );

      this.generatedResume = optimization.optimizedResume;
      alert(`Резюме оптимизировано! ATS Score: ${optimization.atsScore}/100`);
    } catch (error) {
      console.error('Error optimizing resume:', error);
      alert('Ошибка при оптимизации резюме');
    }
  }

  resetForm(): void {
    this.selectedProfiles = [];
    this.targetPosition = '';
    this.vacancyDescription = '';
    this.companyName = '';
    this.selectedEmphasis = [];
    this.selectedLength = ResumeLength.STANDARD;
    this.selectedTone = ResumeTone.PROFESSIONAL;
    this.generatedResume = null;
  }

  getProfileContribution(profileId: string): any {
    return this.generatedResume?.profiles.find(p => p.profileId === profileId);
  }

  getSectionIcon(sectionType: string): string {
    const icons = {
      summary: '📝',
      experience: '💼',
      projects: '🚀',
      skills: '🛠️',
      education: '🎓',
      certifications: '🏆',
      achievements: '⭐'
    };
    return icons[sectionType as keyof typeof icons] || '📄';
  }

  private downloadBlob(blob: Blob, filename: string): void {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }
}