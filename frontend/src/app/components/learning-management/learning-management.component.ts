import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { MessageService } from 'primeng/api';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ProgressBarModule } from 'primeng/progressbar';
import { SelectModule } from 'primeng/select';
import { CheckboxModule } from 'primeng/checkbox';
import { Tooltip } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { MenuModule } from 'primeng/menu';

interface LearningMaterial {
  id: string;
  title: string;
  description: string;
  type: 'course' | 'video' | 'article' | 'webinar' | 'guide';
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // minutes
  url?: string;
  content?: string;
  tags: string[];
  isRequired: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface UserProgress {
  userId: string;
  userName: string;
  userAvatar: string;
  completedMaterials: string[];
  inProgressMaterials: string[];
  totalProgress: number;
  lastActivity: Date;
  certifications: string[];
}

interface LearningStats {
  totalMaterials: number;
  totalUsers: number;
  averageProgress: number;
  completionRate: number;
  popularCategories: { category: string; count: number }[];
  topPerformers: UserProgress[];
}

@Component({
  selector: 'app-learning-management',
  templateUrl: './learning-management.component.html',
  styleUrls: ['./learning-management.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    CardModule,
    DialogModule,
    TranslatePipe,
    ProgressBarModule,
    SelectModule,
    CheckboxModule,
    TableModule,
    ProgressSpinnerModule,
    BadgeModule,
    AvatarModule,
    MenuModule
  ]
})
export class LearningManagementComponent implements OnInit {
  materials: LearningMaterial[] = [];
  userProgress: UserProgress[] = [];
  selectedMaterial: LearningMaterial | null = null;
  showMaterialDialog = false;
  showStatsDialog = false;
  materialForm!: FormGroup;
  isLoading = false;
  activeCategory: string = 'all';
  activeType: string = 'all';

  typeOptions = [
    { label: 'Курс', value: 'course' },
    { label: 'Видео', value: 'video' },
    { label: 'Статья', value: 'article' },
    { label: 'Вебинар', value: 'webinar' },
    { label: 'Руководство', value: 'guide' }
  ];

  difficultyOptions = [
    { label: 'Начальный', value: 'beginner', color: '#28a745' },
    { label: 'Средний', value: 'intermediate', color: '#ffc107' },
    { label: 'Продвинутый', value: 'advanced', color: '#dc3545' }
  ];

  categoryOptions = [
    'Общее',
    'Технические навыки',
    'Soft skills',
    'Управление',
    'Продажи',
    'Маркетинг',
    'Финансы',
    'Юриспруденция'
  ];

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private translate: TranslateService
  ) {
    this.initializeForm();
    this.loadMockData();
  }

  ngOnInit() {}

  private initializeForm() {
    this.materialForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      type: ['course', Validators.required],
      category: ['Общее', Validators.required],
      difficulty: ['beginner', Validators.required],
      duration: [60, [Validators.required, Validators.min(1)]],
      url: [''],
      content: [''],
      tags: [''],
      isRequired: [false]
    });
  }

  private loadMockData() {
    this.materials = [
      {
        id: '1',
        title: 'Основы платформы Rezulution',
        description: 'Полное руководство по использованию всех функций платформы',
        type: 'course',
        category: 'Общее',
        difficulty: 'beginner',
        duration: 120,
        url: 'https://example.com/course1',
        tags: ['платформа', 'основы', 'обучение'],
        isRequired: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '2',
        title: 'Эффективное проведение собеседований',
        description: 'Техники и лучшие практики проведения технических интервью',
        type: 'video',
        category: 'Soft skills',
        difficulty: 'intermediate',
        duration: 90,
        url: 'https://example.com/video1',
        tags: ['собеседования', 'техники', 'HR'],
        isRequired: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '3',
        title: 'Основы GDPR и защита данных',
        description: 'Юридические аспекты работы с персональными данными кандидатов',
        type: 'article',
        category: 'Юриспруденция',
        difficulty: 'intermediate',
        duration: 45,
        content: 'GDPR content here...',
        tags: ['GDPR', 'защита данных', 'юриспруденция'],
        isRequired: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '4',
        title: 'AI-инструменты в рекрутинге',
        description: 'Как использовать искусственный интеллект для улучшения процессов найма',
        type: 'webinar',
        category: 'Технические навыки',
        difficulty: 'advanced',
        duration: 75,
        url: 'https://example.com/webinar1',
        tags: ['AI', 'автоматизация', 'технологии'],
        isRequired: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    this.userProgress = [
      {
        userId: 'user1',
        userName: 'Иван Петров',
        userAvatar: 'ИП',
        completedMaterials: ['1', '2'],
        inProgressMaterials: ['3'],
        totalProgress: 75,
        lastActivity: new Date(),
        certifications: ['Основы платформы']
      },
      {
        userId: 'user2',
        userName: 'Анна Смирнова',
        userAvatar: 'АС',
        completedMaterials: ['1', '2', '3'],
        inProgressMaterials: ['4'],
        totalProgress: 90,
        lastActivity: new Date(),
        certifications: ['Основы платформы', 'GDPR']
      },
      {
        userId: 'user3',
        userName: 'Мария Иванова',
        userAvatar: 'МИ',
        completedMaterials: ['1'],
        inProgressMaterials: ['2', '3'],
        totalProgress: 45,
        lastActivity: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        certifications: []
      }
    ];
  }

  filterMaterials() {
    // Materials are filtered in template using *ngIf
  }

  setCategory(category: string) {
    this.activeCategory = category;
  }

  setType(type: string) {
    this.activeType = type;
  }

  createMaterial() {
    this.selectedMaterial = null;
    this.materialForm.reset({
      type: 'course',
      category: 'Общее',
      difficulty: 'beginner',
      duration: 60,
      isRequired: false,
      tags: []
    });
    this.showMaterialDialog = true;
  }

  editMaterial(material: LearningMaterial) {
    this.selectedMaterial = material;
    this.materialForm.patchValue({
      title: material.title,
      description: material.description,
      type: material.type,
      category: material.category,
      difficulty: material.difficulty,
      duration: material.duration,
      url: material.url || '',
      content: material.content || '',
      tags: material.tags.join(', '),
      isRequired: material.isRequired
    });
    this.showMaterialDialog = true;
  }

  saveMaterial() {
    if (this.materialForm.invalid) return;

    const formValue = this.materialForm.value;
    this.isLoading = true;

    setTimeout(() => {
      if (this.selectedMaterial) {
        this.selectedMaterial.title = formValue.title;
        this.selectedMaterial.description = formValue.description;
        this.selectedMaterial.type = formValue.type;
        this.selectedMaterial.category = formValue.category;
        this.selectedMaterial.difficulty = formValue.difficulty;
        this.selectedMaterial.duration = formValue.duration;
        this.selectedMaterial.url = formValue.url;
        this.selectedMaterial.content = formValue.content;
        this.selectedMaterial.tags = formValue.tags.split(',').map((tag: string) => tag.trim()).filter((tag: string) => tag);
        this.selectedMaterial.isRequired = formValue.isRequired;
        this.selectedMaterial.updatedAt = new Date();

        this.messageService.add({
          severity: 'success',
          summary: 'Материал обновлен'
        });
      } else {
        const newMaterial: LearningMaterial = {
          id: Date.now().toString(),
          title: formValue.title,
          description: formValue.description,
          type: formValue.type,
          category: formValue.category,
          difficulty: formValue.difficulty,
          duration: formValue.duration,
          url: formValue.url,
          content: formValue.content,
          tags: formValue.tags.split(',').map((tag: string) => tag.trim()).filter((tag: string) => tag),
          isRequired: formValue.isRequired,
          createdAt: new Date(),
          updatedAt: new Date()
        };

        this.materials.push(newMaterial);
        this.messageService.add({
          severity: 'success',
          summary: 'Материал создан'
        });
      }

      this.showMaterialDialog = false;
      this.isLoading = false;
    }, 1000);
  }

  deleteMaterial(material: LearningMaterial) {
    this.materials = this.materials.filter(m => m.id !== material.id);
    this.messageService.add({
      severity: 'success',
      summary: 'Материал удален'
    });
  }

  getLearningStats(): LearningStats {
    const totalMaterials = this.materials.length;
    const totalUsers = this.userProgress.length;
    const averageProgress = this.userProgress.reduce((sum, user) => sum + user.totalProgress, 0) / totalUsers;
    const completionRate = this.userProgress.filter(user => user.totalProgress === 100).length / totalUsers * 100;

    const categoryCount: { [key: string]: number } = {};
    this.materials.forEach(material => {
      categoryCount[material.category] = (categoryCount[material.category] || 0) + 1;
    });

    const popularCategories = Object.entries(categoryCount)
      .map(([category, count]) => ({ category, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    const topPerformers = [...this.userProgress]
      .sort((a, b) => b.totalProgress - a.totalProgress)
      .slice(0, 5);

    return {
      totalMaterials,
      totalUsers,
      averageProgress: Math.round(averageProgress),
      completionRate: Math.round(completionRate),
      popularCategories,
      topPerformers
    };
  }

  getDifficultyColor(difficulty: string): string {
    const option = this.difficultyOptions.find(d => d.value === difficulty);
    return option?.color || '#6c757d';
  }

  getDifficultyLabel(difficulty: string): string {
    const option = this.difficultyOptions.find(d => d.value === difficulty);
    return option?.label || difficulty;
  }

  getTypeIcon(type: string): string {
    const icons = {
      course: 'pi pi-graduation-cap',
      video: 'pi pi-video',
      article: 'pi pi-file-text',
      webinar: 'pi pi-users',
      guide: 'pi pi-book'
    };
    return icons[type as keyof typeof icons] || 'pi pi-file';
  }

  getTypeLabel(type: string): string {
    const option = this.typeOptions.find(t => t.value === type);
    return option?.label || type;
  }

  formatDuration(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}ч ${mins}мин`;
    }
    return `${mins}мин`;
  }

  getFilteredMaterials(): LearningMaterial[] {
    return this.materials.filter(material => {
      const categoryMatch = this.activeCategory === 'all' || material.category === this.activeCategory;
      const typeMatch = this.activeType === 'all' || material.type === this.activeType;
      return categoryMatch && typeMatch;
    });
  }

  getUserProgressForMaterial(materialId: string): { completed: number; inProgress: number } {
    const completed = this.userProgress.filter(user => user.completedMaterials.includes(materialId)).length;
    const inProgress = this.userProgress.filter(user => user.inProgressMaterials.includes(materialId)).length;
    return { completed, inProgress };
  }

  getCategoryOptions() {
    return [{label: 'Все', value: 'all'}, ...this.categoryOptions.map(c => ({label: c, value: c}))];
  }

  getTypeOptions() {
    return [{label: 'Все', value: 'all'}, ...this.typeOptions];
  }

  openMaterialUrl(url: string) {
    window.open(url, '_blank');
  }
}