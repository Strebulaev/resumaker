import { Component, inject, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { FormBuilder, Validators, FormArray, FormGroup, AbstractControl, ValidationErrors } from '@angular/forms';
import { format } from 'date-fns';
import { Router } from '@angular/router';
import { Person, Skill, Education, Language } from '../../../../person-schema';

// Simplified Person interface for compatibility
interface SimplifiedPerson {
  name: string;
  gender: 'male' | 'female' | 'unknown';
  desiredPositions?: string[];
  contact: {
    phone?: string;
    email: string;
    linkedin?: string;
    github?: string;
  };
  location: {
    country?: string;
    city: string;
    relocation: boolean;
    remote: boolean;
    business_trips: boolean;
  };
  languages?: Language[];
  skills?: Skill[];
  education?: Education[];
  experience?: any[];
  hobby?: string[];
  literature?: string[];
}
import { ProfileService } from '../../../../shared/profile/profile.service';
import { TranslateService } from '@ngx-translate/core';
import { SupabaseService } from '../../../../shared/db/supabase.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss'],
  standalone: false,
  providers: [MessageService]
})
export class ProfileEditComponent implements OnInit {
  private fb = inject(FormBuilder);
  private translate = inject(TranslateService);
  
  profileForm = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(100)]],
    gender: ['unknown' as 'unknown' | 'male' | 'female'],
    desiredPositions: this.fb.array([]),
    salary_expectations: this.fb.group({
      min: [0, [Validators.min(0)]],
      max: [0, [Validators.min(0)]],
      currency: ['RUB']
    }),
    employment_types: this.fb.array([]),
    work_formats: this.fb.array([]),
    notice_period: [14, [Validators.min(0), Validators.max(90)]],
    career_level: ['middle'],
    contact: this.fb.group({
      phone: ['', [Validators.pattern(/^\+[0-9]{11}$/)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
      linkedin: ['', [this.urlValidator]],
      github: ['', [this.urlValidator]]
    }),
    location: this.fb.group({
      country: [''],
      city: ['', [Validators.required, Validators.maxLength(50)]],
      relocation: [false as boolean],
      remote: [false as boolean],
      business_trips: [false as boolean]
    }),
    languages: this.fb.array([]),
    skills: this.fb.array([]),
    education: this.fb.array([]),
    experience: this.fb.array([]),
    hobby: this.fb.array([]),
    literature: this.fb.array([])
  });
  loading = false;
  previewVisible = false;
  previewContent = '';
  previewFormat: 'yaml' | 'txt' = 'yaml';
  languageLevels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  genderOptions = [
    { label: this.translate.instant('PROFILE.PERSONAL_INFO.GENDER_OPTIONS.MALE'), value: 'male' },
    { label: this.translate.instant('PROFILE.PERSONAL_INFO.GENDER_OPTIONS.FEMALE'), value: 'female' },
    { label: this.translate.instant('PROFILE.PERSONAL_INFO.GENDER_OPTIONS.UNKNOWN'), value: 'unknown' }
  ];  

  // Avatar properties
  avatarPreview: string = '';
  avatarFile: File | null = null;
  avatarUploadProgress: number = 0;

  constructor(
    private profileService: ProfileService,
    private supabaseService: SupabaseService,
    private messageService: MessageService,
    private router: Router
  ) {}
  

  ngOnInit(): void {
    this.loadProfile();
    this.translate.get([
      'PROFILE.PERSONAL_INFO.GENDER_OPTIONS.MALE',
      'PROFILE.PERSONAL_INFO.GENDER_OPTIONS.FEMALE', 
      'PROFILE.PERSONAL_INFO.GENDER_OPTIONS.UNKNOWN'
    ]).subscribe(translations => {
      this.genderOptions = [
        { label: translations['PROFILE.PERSONAL_INFO.GENDER_OPTIONS.MALE'], value: 'male' },
        { label: translations['PROFILE.PERSONAL_INFO.GENDER_OPTIONS.FEMALE'], value: 'female' },
        { label: translations['PROFILE.PERSONAL_INFO.GENDER_OPTIONS.UNKNOWN'], value: 'unknown' }
      ];
    });
  }

  private patchFormValues(profile: SimplifiedPerson): void {
    this.clearAllArrays();
  
    this.profileForm.patchValue({
      name: profile.name,
      gender: profile.gender
    });
  
    if (this.contact) {
      this.contact.patchValue({
        phone: profile.contact.phone || '',
        email: profile.contact.email || '',
        linkedin: profile.contact['linkedin'] || '',
        github: profile.contact['github'] || ''
      });
    }
  
    if (this.location) {
      this.location.patchValue({
        country: profile.location.country || '',
        city: profile.location.city || '',
        relocation: profile.location.relocation || false,
        remote: profile.location.remote || false,
        business_trips: profile.location.business_trips || false
      });
    }
  
    profile.skills?.forEach(skill => this.addSkill(skill));
    
    profile.desiredPositions?.forEach(pos => this.addDesiredPosition(pos));
    profile.languages?.forEach(lang => this.addLanguage(lang));
    profile.education?.forEach(edu => this.addEducation(edu));
    
    profile.experience?.forEach(exp => {
      const expForForm = {
        ...exp,
        startDate: exp.start_date ? new Date(exp.start_date) : null,
        endDate: exp.end_date ? new Date(exp.end_date) : null,
        current: !exp.end_date // Если нет end_date, значит текущая работа
      };
      this.addExperience(expForForm);
    });

    profile.hobby?.forEach(h => this.addHobby(h));
    profile.literature?.forEach(l => this.addLiterature(l));

    // Set avatar preview from user profile
    this.setAvatarFromProfile();
  }

  private setAvatarFromProfile(): void {
    // Get avatar from current user metadata or profile
    const userAvatar = this.supabaseService.currentUser?.user_metadata?.['avatar_url'];
    if (userAvatar) {
      this.avatarPreview = userAvatar;
    } else {
      // Try to get from profile data if available
      this.supabaseService.getFullProfile().then(profile => {
        if (profile?.avatar_url) {
          this.avatarPreview = profile.avatar_url;
        }
      });
    }
  }

  closePreview(): void {
    this.previewVisible = false;
  }
  private urlValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value || control.value === '') {
      return null; 
    }
    
    const url = control.value;
    if (url.includes('.') || url.startsWith('http://') || url.startsWith('https://')) {
      return null;
    }
    return { invalidUrl: true };
  }
  compareGenderObjects(option: any, value: any): boolean {
    if (!value || !option) return false;
    if (typeof value === 'object') {
      return option.value === value.value;
    }
    return option.value === value;
  }
  get desiredPositions(): FormArray {
    return this.profileForm.get('desiredPositions') as FormArray;
  }

  get languages(): FormArray {
    return this.profileForm.get('languages') as FormArray;
  }

  get skills(): FormArray {
    return this.profileForm.get('skills') as FormArray;
  }
  get contact(): FormGroup {
    return this.profileForm.get('contact') as FormGroup;
  }
  
  get location(): FormGroup {
    return this.profileForm.get('location') as FormGroup;
  }
  
  get contactEmail() {
    return this.contact.get('email');
  }
  
  get contactPhone() {
    return this.contact.get('phone');
  }
  
  get contactLinkedin() {
    return this.contact.get('linkedin');
  }
  
  get contactGithub() {
    return this.contact.get('github');
  }
  
  get locationCountry() {
    return this.location.get('country');
  }
  
  get locationCity() {
    return this.location.get('city');
  }
  
  get locationRelocation() {
    return this.location.get('relocation');
  }
  
  get locationRemote() {
    return this.location.get('remote');
  }
  
  get locationBusinessTrips() {
    return this.location.get('business_trips');
  }
  get education(): FormArray {
    return this.profileForm.get('education') as FormArray;
  }

  get experience(): FormArray {
    return this.profileForm.get('experience') as FormArray;
  }

  get hobby(): FormArray {
    return this.profileForm.get('hobby') as FormArray;
  }

  get literature(): FormArray {
    return this.profileForm.get('literature') as FormArray;
  }

  getFormGroup(control: AbstractControl): FormGroup {
    return control as FormGroup;
  }
  
  clearAllArrays(): void {
    this.desiredPositions.clear();
    this.languages.clear();
    this.skills.clear();
    this.education.clear();
    this.experience.clear();
    this.hobby.clear();
    this.literature.clear();
  }

  addDesiredPosition(value = ''): void {
    this.desiredPositions.push(this.fb.control(value, [Validators.required, Validators.maxLength(100)]));
  }

  removeDesiredPosition(index: number): void {
    this.desiredPositions.removeAt(index);
  }

  addLanguage(lang?: Language): void {
    this.languages.push(this.fb.group({
      language: [lang?.language || '', [Validators.required, Validators.maxLength(50)]],
      level: [lang?.level || 'B2', [Validators.required]]
    }));
  }

  removeLanguage(index: number): void {
    this.languages.removeAt(index);
  }

  addSkill(skill?: Skill): void {
    this.skills.push(this.fb.group({
      area: [skill?.area || '', [Validators.required, Validators.maxLength(50)]],
      name: [skill?.name || '', [Validators.required, Validators.maxLength(50)]],
      level: [skill?.level || 5, [Validators.required, Validators.min(1), Validators.max(10)]]
    }));
  }

  removeSkill(index: number): void {
    this.skills.removeAt(index);
  }

  addEducation(edu?: Education): void {
    this.education.push(this.fb.group({
      institution: [edu?.institution || '', [Validators.required, Validators.maxLength(100)]],
      degree: [edu?.degree || '', [Validators.required, Validators.maxLength(50)]],
      specialty: [edu?.specialty || '', [Validators.required, Validators.maxLength(100)]],
      start_year: [edu?.start_year || null, [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]]
    }));
  }

  removeEducation(index: number): void {
    this.education.removeAt(index);
  }
  get currentYear(): number {
    return new Date().getFullYear();
  }

  addExperience(exp?: any): void {
    const expGroup = this.fb.group({
      company: [exp?.company || '', [Validators.required, Validators.maxLength(100)]],
      position: [exp?.position || '', [Validators.required, Validators.maxLength(100)]],
      startDate: [exp?.startDate || '', [Validators.required]],
      endDate: [exp?.endDate || ''],
      current: [exp?.current || false],
      tasks: this.fb.array([]),
      stack: this.fb.array([]),
      achievements: this.fb.array([])
    });
  
    // Заполняем массивы если есть данные
    if (exp?.tasks) {
      exp.tasks.forEach((task: string) => this.addTask(expGroup, task));
    }
    if (exp?.stack) {
      exp.stack.forEach((tech: string) => this.addTech(expGroup, tech));
    }
    if (exp?.achievements) {
      exp.achievements.forEach((ach: any) => this.addAchievement(expGroup, ach));
    }
    
    this.experience.push(expGroup);
  }

  addTask(exp: FormGroup, value: string = ''): void {
    const tasks = exp.get('tasks') as FormArray;
    tasks.push(this.fb.control(value));
  }
  
  addTech(exp: FormGroup, value: string = ''): void {
    const techArray = exp.get('stack') as FormArray;
    techArray.push(this.fb.control(value, [Validators.required, Validators.maxLength(50)]));
  }
  
  addAchievement(exp: FormGroup, ach?: any): void {
    const achievementsArray = exp.get('achievements') as FormArray;
    achievementsArray.push(this.fb.group({
      name: [ach?.name || '', [Validators.required, Validators.maxLength(100)]],
      initial_value: [ach?.initial_value || 0, [Validators.required, Validators.min(0)]],
      final_value: [ach?.final_value || 0, [Validators.required, Validators.min(0)]],
      uom: [ach?.uom || ''],
      type: [ach?.type || '']
    }));
  }

  getExperienceGroup(index: number): FormGroup {
    return this.experience.at(index) as FormGroup;
  }

  getTasksArray(exp: AbstractControl): FormArray {
    const formGroup = exp as FormGroup;
    return formGroup.get('tasks') as FormArray;
  }
  
  getTechArray(exp: AbstractControl): FormArray {
    const formGroup = exp as FormGroup;
    return formGroup.get('stack') as FormArray;
  }
  
  getAchievementsArray(exp: AbstractControl): FormArray {
    const formGroup = exp as FormGroup;
    return formGroup.get('achievements') as FormArray;
  }
  
  removeTask(expIndex: number, taskIndex: number): void {
    const expGroup = this.experience.at(expIndex) as FormGroup;
    const tasksArray = expGroup.get('tasks') as FormArray;
    tasksArray.removeAt(taskIndex);
  }
  
  removeTech(expIndex: number, techIndex: number): void {
    const expGroup = this.experience.at(expIndex) as FormGroup;
    const techArray = expGroup.get('stack') as FormArray;
    techArray.removeAt(techIndex);
  }
  removeAchievement(expIndex: number, achievementIndex: number): void {
    const expGroup = this.experience.at(expIndex) as FormGroup;
    const achievementsArray = expGroup.get('achievements') as FormArray;
    achievementsArray.removeAt(achievementIndex);
  }

  removeExperience(index: number): void {
    this.experience.removeAt(index);
  }

  addHobby(value = ''): void {
    this.hobby.push(this.fb.control(value, [Validators.maxLength(100)]));
  }

  removeHobby(index: number): void {
    this.hobby.removeAt(index);
  }

  addLiterature(value = ''): void {
    this.literature.push(this.fb.control(value, [Validators.maxLength(200)]));
  }

  removeLiterature(index: number): void {
    this.literature.removeAt(index);
  }

  // Avatar methods
  onAvatarSelected(event: any): void {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      this.messageService.add({
        severity: 'error',
        summary: this.translate.instant('PROFILE.AVATAR.ERROR.INVALID_TYPE')
      });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      this.messageService.add({
        severity: 'error',
        summary: this.translate.instant('PROFILE.AVATAR.ERROR.SIZE_LIMIT')
      });
      return;
    }

    this.avatarFile = file;
    
    // Create preview
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.avatarPreview = e.target.result;
    };
    reader.readAsDataURL(file);

    // Reset file input
    event.target.value = '';
  }

  removeAvatar(): void {
    this.avatarPreview = '';
    this.avatarFile = null;
    this.avatarUploadProgress = 0;
  }

  async uploadAvatar(): Promise<string | null> {
    if (!this.avatarFile) {
      return null;
    }

    try {
      this.avatarUploadProgress = 10;
      
      // In a real implementation, you would upload to Supabase Storage
      // For now, we'll use the base64 data URL as the avatar URL
      // In production, you should upload to Supabase Storage and get the public URL
      
      this.avatarUploadProgress = 100;
      
      // Return the data URL for immediate use
      // Note: In production, you should upload to Supabase Storage and return the public URL
      return this.avatarPreview;
      
    } catch (error) {
      console.error('Avatar upload error:', error);
      this.messageService.add({
        severity: 'error',
        summary: this.translate.instant('PROFILE.AVATAR.ERROR.UPLOAD_FAILED')
      });
      return null;
    } finally {
      setTimeout(() => {
        this.avatarUploadProgress = 0;
      }, 1000);
    }
  }

  getProfileDataFromForm(): Person {
    const formValue = this.profileForm.value;
    
    // Преобразуем даты в правильный формат YYYY-MM-DD
    const skills = this.skills.value.map((skill: any) => ({
      area: skill.area || '',
      name: skill.name || '',
      level: Number(skill.level) || 5,
      date: this.formatDateToYYYYMMDD(skill.date) // Должен быть string в формате YYYY-MM-DD
    }));
  
    // Валидируем URL
    const linkedin = this.validateAndFormatUrl(formValue.contact?.['linkedin'] || '');
    const github = this.validateAndFormatUrl(formValue.contact?.['github'] || '');
  
    // Преобразуем опыт работы
    const experience = this.experience.value.map((exp: any) => ({
      company: exp.company || '',
      position: exp.position || '',
      start_date: this.formatDateToYYYYMMDD(exp.startDate), // string YYYY-MM-DD
      end_date: exp.current ? null : this.formatDateToYYYYMMDD(exp.endDate), // string YYYY-MM-DD или null
      tasks: exp.tasks || [],
      stack: exp.stack || [],
      achievements: exp.achievements || []
    }));

    return {
      name: formValue.name || '',
      gender: (formValue.gender || 'unknown') as 'male' | 'female' | 'unknown',
      desiredPositions: this.desiredPositions.value || [],
      salary_expectations: {
        min: formValue.salary_expectations?.min || 0,
        max: formValue.salary_expectations?.max || 0,
        currency: (formValue.salary_expectations?.currency || 'RUB') as 'RUB' | 'USD' | 'EUR' | 'KZT'
      },
      employment_types: (formValue.employment_types || []) as ('full-time' | 'part-time' | 'contract' | 'freelance' | 'internship')[],
      work_formats: (formValue.work_formats || []) as ('office' | 'remote' | 'hybrid')[],
      notice_period: formValue.notice_period || 14,
      career_level: (formValue.career_level || 'middle') as 'trainee' | 'junior' | 'middle' | 'senior' | 'lead' | 'head',
      contact: {
        phone: formValue.contact?.phone || '',
        email: formValue.contact?.email || '',
        linkedin: linkedin,
        github: github
      },
      location: {
        country: formValue.location?.country || '',
        city: formValue.location?.city || '',
        relocation: !!formValue.location?.relocation,
        remote: !!formValue.location?.remote,
        business_trips: !!formValue.location?.business_trips
      },
      languages: this.languages.value.map((l: any) => ({
        language: l.language || '',
        level: l.level || 'B2'
      })),
      skills: skills,
      education: this.education.value.map((e: any) => ({
        institution: e.institution || '',
        degree: e.degree || '',
        specialty: e.specialty || '',
        start_year: Number(e.start_year) || new Date().getFullYear()
      })),
      experience: experience,
      hobby: this.hobby.value || [],
      literature: this.literature.value || []
    };
  }
  
  // Преобразование даты в формат YYYY-MM-DD
  private formatDateToYYYYMMDD(date: any): string {
    if (!date) {
      return new Date().toISOString().split('T')[0]; // Текущая дата по умолчанию
    }
  
    try {
      if (date instanceof Date) {
        return date.toISOString().split('T')[0];
      }
      
      if (typeof date === 'string') {
        // Если уже в правильном формате
        if (date.match(/^\d{4}-\d{2}-\d{2}$/)) {
          return date;
        }
        
        // Пытаемся распарсить другие форматы
        const parsedDate = new Date(date);
        if (!isNaN(parsedDate.getTime())) {
          return parsedDate.toISOString().split('T')[0];
        }
      }
    } catch (error) {
      console.error('Date parsing error:', error);
    }
    
    // Fallback - текущая дата
    return new Date().toISOString().split('T')[0];
  }
  
  // Валидация и форматирование URL
  private validateAndFormatUrl(url: string): string {
    if (!url || url.trim() === '') {
      return '';
    }
  
    const trimmedUrl = url.trim();
    
    // Если уже валидный URL, возвращаем как есть
    if (trimmedUrl.startsWith('http://') || trimmedUrl.startsWith('https://')) {
      return trimmedUrl;
    }
    
    // Если похоже на домен, добавляем https://
    if (trimmedUrl.includes('.') && !trimmedUrl.includes(' ')) {
      return `https://${trimmedUrl}`;
    }
    
    // Для некорректных URL возвращаем пустую строку
    return '';
  }
  
  // Преобразование Date в строку формата YYYY-MM-DD
  private formatDateForBackend(date: any): string {
    if (!date) return '';
    
    if (date instanceof Date) {
      return date.toISOString().split('T')[0]; // YYYY-MM-DD
    }
    
    if (typeof date === 'string') {
      // Если уже строка, проверяем формат
      if (date.match(/^\d{4}-\d{2}-\d{2}$/)) {
        return date;
      }
      // Пытаемся преобразовать из других форматов
      const parsedDate = new Date(date);
      if (!isNaN(parsedDate.getTime())) {
        return parsedDate.toISOString().split('T')[0];
      }
    }
    
    return '';
  }
  
  // Валидация и форматирование URL
  private formatUrl(url: string): string {
    if (!url) return '';
    
    // Если URL уже начинается с http:// или https://, оставляем как есть
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    
    // Если есть точка (домен), добавляем https://
    if (url.includes('.') && !url.includes(' ')) {
      return `https://${url}`;
    }
    
    // Для пустых или некорректных значений возвращаем пустую строку
    return '';
  }
  
  private ensureUrlProtocol(url: string): string {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    if (url.includes('.')) {
      return `https://${url}`;
    }
    return '';
  }

  showPreview(format: 'yaml' | 'txt'): void {
    const profileData = this.getProfileDataFromForm();
    this.previewFormat = format;
    
    if (format === 'yaml') {
      this.previewContent = this.profileService.exportToYaml(profileData);
    } else {
      this.previewContent = this.profileService.exportToTxt(profileData);
    }
    
    this.previewVisible = true;
  }
  private showSaveError(error: any): void {
    console.error('Save error details:', error);
    
    let errorMessage = this.translate.instant('PROFILE.ACTIONS.SAVE_ERROR');
    
    if (error?.message) {
      errorMessage += `: ${error.message}`;
    }
    
    this.messageService.add({
      severity: 'error',
      summary: errorMessage,
      life: 5000
    });
  }
  
  async saveProfile(): Promise<void> {
    if (this.profileForm.invalid) {
      this.markAllAsTouched();
      this.messageService.add({
        severity: 'error',
        summary: this.translate.instant('PROFILE.VALIDATION.FORM_ERROR')
      });
      return;
    }
  
    this.loading = true;
    
    try {
      // Upload avatar first if selected
      let avatarUrl: string | null = this.avatarPreview;
      if (this.avatarFile && this.avatarPreview.startsWith('data:')) {
        const uploadedAvatarUrl = await this.uploadAvatar();
        
        if (uploadedAvatarUrl) {
          avatarUrl = uploadedAvatarUrl;
          const { error } = await this.supabaseService.updateAvatar(avatarUrl);
          if (error) {
            console.error('Error updating avatar:', error);
          }
        }
      }
  
      const profileData = this.getProfileDataFromForm();
      
      this.profileService.saveProfile(profileData).subscribe({
        next: (success) => {
          this.loading = false;
          if (success) {
            this.messageService.add({
              severity: 'success',
              summary: this.translate.instant('PROFILE.ACTIONS.SAVE_SUCCESS')
            });
            this.router.navigate(['/profile/view']);
          } else {
            this.showSaveError(new Error('Unknown save error'));
          }
        },
        error: (error) => {
          this.loading = false;
          this.showSaveError(error);
        }
      });
      
    } catch (error) {
      this.loading = false;
      this.showSaveError(error);
    }
  }
  
  onFileSelect(event: any): void {
    const file = event.files[0];
    if (!file) return;
  
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        this.profileService.importFromYaml(content).subscribe({
          next: (profile) => {
            if (profile) {
              this.patchFormValues(profile);
              this.messageService.add({
                severity: 'success',
                summary: this.translate.instant('PROFILE.ACTIONS.IMPORT_SUCCESS')
              });
            } else {
              this.messageService.add({
                severity: 'error',
                summary: this.translate.instant('PROFILE.ACTIONS.IMPORT_ERROR')
              });
            }
          },
          error: (error) => {
            console.error('Import error:', error);
            this.messageService.add({
              severity: 'error',
              summary: this.translate.instant('PROFILE.ACTIONS.IMPORT_ERROR'),
              detail: error.message
            });
          }
        });
      } catch (e) {
        console.error('File reading error:', e);
        this.messageService.add({
          severity: 'error',
          summary: this.translate.instant('PROFILE.ACTIONS.IMPORT_ERROR')
        });
      }
    };
    reader.readAsText(file);
  }

  downloadFile(content: string, format: 'yaml' | 'txt'): void {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `profile_${formatDate(new Date(), 'yyyyMMdd')}.${format}`;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  resetForm(): void {
    if (confirm(this.translate.instant('PROFILE.ACTIONS.RESET_CONFIRM'))) {
      this.loadProfile();
    }
  }

  private markAllAsTouched(): void {
    Object.values(this.profileForm.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        Object.values(control.controls).forEach(subControl => {
          subControl.markAsTouched();
        });
      } else if (control instanceof FormArray) {
        control.controls.forEach(arrayControl => {
          arrayControl.markAsTouched();
          if (arrayControl instanceof FormGroup) {
            Object.values(arrayControl.controls).forEach(subControl => {
              subControl.markAsTouched();
            });
          }
        });
      }
    });
  }
  loadProfile(): void {
    this.loading = true;
    this.profileService.loadProfile().subscribe({
      next: (profile) => {
        if (profile) {
          this.patchFormValues(profile);
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading profile:', error);
        this.loading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Ошибка загрузки профиля',
          detail: error.message
        });
      }
    });
  }
  getCompletionPercentage(): number {
    const totalFields = 15;
    let completedFields = 0;

    if (this.profileForm.get('name')?.value) completedFields++;
    if (this.profileForm.get('contact.email')?.value) completedFields++;
    if (this.profileForm.get('location.city')?.value) completedFields++;
    if (this.desiredPositions.length > 0) completedFields++;
    if (this.languages.length > 0) completedFields++;
    if (this.skills.length > 0) completedFields++;
    if (this.education.length > 0) completedFields++;
    if (this.experience.length > 0) completedFields++;

    return Math.round((completedFields / totalFields) * 100);
  }
}

function formatDate(date: Date, formatStr: string): string {
  return format(date, formatStr);
}