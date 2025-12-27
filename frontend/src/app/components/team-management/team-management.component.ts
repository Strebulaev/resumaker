import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { MessageService } from 'primeng/api';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { SelectModule } from 'primeng/select';
import { MultiSelectModule } from 'primeng/multiselect';
import { CheckboxModule } from 'primeng/checkbox';
import { Tooltip } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { MenuModule } from 'primeng/menu';

interface Team {
  id: string;
  name: string;
  description: string;
  members: TeamMember[];
  createdAt: Date;
  updatedAt: Date;
}

interface TeamMember {
  id: string;
  userId: string;
  email: string;
  role: 'owner' | 'hr_director' | 'recruiter' | 'viewer' | 'analyst' | 'hiring_manager';
  permissions: string[];
  invitedAt: Date;
  joinedAt?: Date;
  isActive: boolean;
  avatar?: string;
  name: string;
}

interface Workspace {
  id: string;
  name: string;
  type: 'main' | 'specialized' | 'international';
  members: TeamMember[];
  vacancies: any[];
  budget: number;
  settings: WorkspaceSettings;
}

interface WorkspaceSettings {
  isolatedData: boolean;
  customTemplates: boolean;
  individualPipeline: boolean;
  separateAnalytics: boolean;
  automation: {
    aiScreening: boolean;
    autoInvitations: boolean;
    smartDistribution: boolean;
    dailyReports: boolean;
  };
}

@Component({
  selector: 'app-team-management',
  templateUrl: './team-management.component.html',
  styleUrls: ['./team-management.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    Tooltip,
    InputTextModule,
    CardModule,
    DialogModule,
    TranslatePipe,
    SelectModule,
    MultiSelectModule,
    CheckboxModule,
    TableModule,
    ProgressSpinnerModule,
    BadgeModule,
    AvatarModule,
    MenuModule
  ]
})
export class TeamManagementComponent implements OnInit {
  teams: Team[] = [];
  workspaces: Workspace[] = [];
  selectedTeam: Team | null = null;
  selectedWorkspace: Workspace | null = null;
  showTeamDialog = false;
  showWorkspaceDialog = false;
  showMemberDialog = false;
  teamForm!: FormGroup;
  workspaceForm!: FormGroup;
  memberForm!: FormGroup;
  isLoading = false;
  activeTab: 'teams' | 'workspaces' = 'teams';

  roleOptions = [
    { label: 'Владелец', value: 'owner' },
    { label: 'HR Директор', value: 'hr_director' },
    { label: 'Рекрутер', value: 'recruiter' },
    { label: 'Наблюдатель', value: 'viewer' },
    { label: 'Аналитик', value: 'analyst' },
    { label: 'Менеджер по найму', value: 'hiring_manager' }
  ];

  workspaceTypeOptions = [
    { label: 'Основное', value: 'main' },
    { label: 'Специализированное', value: 'specialized' },
    { label: 'Международное', value: 'international' }
  ];

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private translate: TranslateService
  ) {
    this.initializeForms();
    this.loadMockData();
  }

  ngOnInit() {}

  private initializeForms() {
    this.teamForm = this.fb.group({
      name: ['', Validators.required],
      description: ['']
    });

    this.workspaceForm = this.fb.group({
      name: ['', Validators.required],
      type: ['specialized', Validators.required],
      budget: [0, Validators.min(0)],
      isolatedData: [true],
      customTemplates: [true],
      individualPipeline: [true],
      separateAnalytics: [true],
      aiScreening: [true],
      autoInvitations: [true],
      smartDistribution: [true],
      dailyReports: [true]
    });

    this.memberForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      role: ['recruiter', Validators.required],
      permissions: [[]]
    });
  }

  private loadMockData() {
    this.teams = [
      {
        id: '1',
        name: 'Основная команда',
        description: 'Главная команда рекрутеров',
        members: [
          {
            id: '1',
            userId: 'user1',
            email: 'ivan@example.com',
            role: 'owner',
            permissions: ['all'],
            invitedAt: new Date(),
            joinedAt: new Date(),
            isActive: true,
            name: 'Иван Петров',
            avatar: 'IP'
          },
          {
            id: '2',
            userId: 'user2',
            email: 'anna@example.com',
            role: 'hr_director',
            permissions: ['manage_team', 'view_reports'],
            invitedAt: new Date(),
            joinedAt: new Date(),
            isActive: true,
            name: 'Анна Смирнова',
            avatar: 'АС'
          }
        ],
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    this.workspaces = [
      {
        id: '1',
        name: 'Основное пространство',
        type: 'main',
        members: this.teams[0].members,
        vacancies: [],
        budget: 2500000,
        settings: {
          isolatedData: false,
          customTemplates: false,
          individualPipeline: false,
          separateAnalytics: false,
          automation: {
            aiScreening: true,
            autoInvitations: true,
            smartDistribution: true,
            dailyReports: true
          }
        }
      },
      {
        id: '2',
        name: 'Tech Hiring',
        type: 'specialized',
        members: [this.teams[0].members[0], this.teams[0].members[1]],
        vacancies: [],
        budget: 2000000,
        settings: {
          isolatedData: true,
          customTemplates: true,
          individualPipeline: true,
          separateAnalytics: true,
          automation: {
            aiScreening: true,
            autoInvitations: true,
            smartDistribution: true,
            dailyReports: true
          }
        }
      }
    ];
  }

  showSection(section: 'teams' | 'workspaces') {
    this.activeTab = section;
  }

  createTeam() {
    this.selectedTeam = null;
    this.teamForm.reset();
    this.showTeamDialog = true;
  }

  editTeam(team: Team) {
    this.selectedTeam = team;
    this.teamForm.patchValue({
      name: team.name,
      description: team.description
    });
    this.showTeamDialog = true;
  }

  saveTeam() {
    if (this.teamForm.invalid) return;

    const formValue = this.teamForm.value;
    this.isLoading = true;

    setTimeout(() => {
      if (this.selectedTeam) {
        this.selectedTeam.name = formValue.name;
        this.selectedTeam.description = formValue.description;
        this.selectedTeam.updatedAt = new Date();
        this.messageService.add({
          severity: 'success',
          summary: 'Команда обновлена'
        });
      } else {
        const newTeam: Team = {
          id: Date.now().toString(),
          name: formValue.name,
          description: formValue.description,
          members: [],
          createdAt: new Date(),
          updatedAt: new Date()
        };
        this.teams.push(newTeam);
        this.messageService.add({
          severity: 'success',
          summary: 'Команда создана'
        });
      }

      this.showTeamDialog = false;
      this.isLoading = false;
    }, 1000);
  }

  deleteTeam(team: Team) {
    this.teams = this.teams.filter(t => t.id !== team.id);
    this.messageService.add({
      severity: 'success',
      summary: 'Команда удалена'
    });
  }

  createWorkspace() {
    this.selectedWorkspace = null;
    this.workspaceForm.reset({
      type: 'specialized',
      budget: 0,
      isolatedData: true,
      customTemplates: true,
      individualPipeline: true,
      separateAnalytics: true,
      aiScreening: true,
      autoInvitations: true,
      smartDistribution: true,
      dailyReports: true
    });
    this.showWorkspaceDialog = true;
  }

  editWorkspace(workspace: Workspace) {
    this.selectedWorkspace = workspace;
    this.workspaceForm.patchValue({
      name: workspace.name,
      type: workspace.type,
      budget: workspace.budget,
      isolatedData: workspace.settings.isolatedData,
      customTemplates: workspace.settings.customTemplates,
      individualPipeline: workspace.settings.individualPipeline,
      separateAnalytics: workspace.settings.separateAnalytics,
      aiScreening: workspace.settings.automation.aiScreening,
      autoInvitations: workspace.settings.automation.autoInvitations,
      smartDistribution: workspace.settings.automation.smartDistribution,
      dailyReports: workspace.settings.automation.dailyReports
    });
    this.showWorkspaceDialog = true;
  }

  saveWorkspace() {
    if (this.workspaceForm.invalid) return;

    const formValue = this.workspaceForm.value;
    this.isLoading = true;

    setTimeout(() => {
      if (this.selectedWorkspace) {
        this.selectedWorkspace.name = formValue.name;
        this.selectedWorkspace.type = formValue.type;
        this.selectedWorkspace.budget = formValue.budget;
        this.selectedWorkspace.settings = {
          isolatedData: formValue.isolatedData,
          customTemplates: formValue.customTemplates,
          individualPipeline: formValue.individualPipeline,
          separateAnalytics: formValue.separateAnalytics,
          automation: {
            aiScreening: formValue.aiScreening,
            autoInvitations: formValue.autoInvitations,
            smartDistribution: formValue.smartDistribution,
            dailyReports: formValue.dailyReports
          }
        };
        this.messageService.add({
          severity: 'success',
          summary: 'Рабочее пространство обновлено'
        });
      } else {
        const newWorkspace: Workspace = {
          id: Date.now().toString(),
          name: formValue.name,
          type: formValue.type,
          members: [],
          vacancies: [],
          budget: formValue.budget,
          settings: {
            isolatedData: formValue.isolatedData,
            customTemplates: formValue.customTemplates,
            individualPipeline: formValue.individualPipeline,
            separateAnalytics: formValue.separateAnalytics,
            automation: {
              aiScreening: formValue.aiScreening,
              autoInvitations: formValue.autoInvitations,
              smartDistribution: formValue.smartDistribution,
              dailyReports: formValue.dailyReports
            }
          }
        };
        this.workspaces.push(newWorkspace);
        this.messageService.add({
          severity: 'success',
          summary: 'Рабочее пространство создано'
        });
      }

      this.showWorkspaceDialog = false;
      this.isLoading = false;
    }, 1000);
  }

  deleteWorkspace(workspace: Workspace) {
    this.workspaces = this.workspaces.filter(w => w.id !== workspace.id);
    this.messageService.add({
      severity: 'success',
      summary: 'Рабочее пространство удалено'
    });
  }

  addMember(team: Team) {
    this.selectedTeam = team;
    this.memberForm.reset({
      role: 'recruiter',
      permissions: []
    });
    this.showMemberDialog = true;
  }

  saveMember() {
    if (this.memberForm.invalid || !this.selectedTeam) return;

    const formValue = this.memberForm.value;
    this.isLoading = true;

    setTimeout(() => {
      const newMember: TeamMember = {
        id: Date.now().toString(),
        userId: 'user' + Date.now(),
        email: formValue.email,
        role: formValue.role,
        permissions: formValue.permissions,
        invitedAt: new Date(),
        isActive: false,
        name: formValue.email.split('@')[0],
        avatar: formValue.email.substring(0, 2).toUpperCase()
      };

      this.selectedTeam!.members.push(newMember);
      this.showMemberDialog = false;
      this.isLoading = false;

      this.messageService.add({
        severity: 'success',
        summary: 'Приглашение отправлено'
      });
    }, 1000);
  }

  removeMember(team: Team, member: TeamMember) {
    team.members = team.members.filter(m => m.id !== member.id);
    this.messageService.add({
      severity: 'success',
      summary: 'Участник удален'
    });
  }

  getRoleLabel(role: string): string {
    const option = this.roleOptions.find(o => o.value === role);
    return option ? option.label : role;
  }

  getWorkspaceTypeLabel(type: string): string {
    const option = this.workspaceTypeOptions.find(o => o.value === type);
    return option ? option.label : type;
  }

  formatBudget(budget: number): string {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0
    }).format(budget);
  }
}