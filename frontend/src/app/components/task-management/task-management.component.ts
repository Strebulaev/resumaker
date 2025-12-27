import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { MessageService } from 'primeng/api';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { CheckboxModule } from 'primeng/checkbox';
import { Tooltip } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { MenuModule } from 'primeng/menu';

interface Task {
  id: string;
  title: string;
  description: string;
  assignee: string;
  assigneeName: string;
  assigneeAvatar: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'todo' | 'in_progress' | 'review' | 'completed';
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
  estimatedHours?: number;
  actualHours?: number;
  relatedTo?: {
    type: 'vacancy' | 'candidate' | 'team';
    id: string;
    title: string;
  };
}

interface TaskStats {
  total: number;
  completed: number;
  inProgress: number;
  overdue: number;
  completionRate: number;
}

@Component({
  selector: 'app-task-management',
  templateUrl: './task-management.component.html',
  styleUrls: ['./task-management.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    CardModule,
    DialogModule,
    TranslatePipe,
    MultiSelectModule,
    SelectModule,
    CheckboxModule,
    TableModule,
    ProgressSpinnerModule,
    BadgeModule,
    AvatarModule,
    MenuModule
  ]
})
export class TaskManagementComponent implements OnInit {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  selectedTask: Task | null = null;
  showTaskDialog = false;
  showStatsDialog = false;
  taskForm!: FormGroup;
  isLoading = false;
  activeFilter: 'all' | 'my' | 'team' | 'overdue' = 'all';
  activeView: 'list' | 'board' | 'calendar' = 'list';

  priorityOptions = [
    { label: 'Низкий', value: 'low', color: '#28a745' },
    { label: 'Средний', value: 'medium', color: '#ffc107' },
    { label: 'Высокий', value: 'high', color: '#fd7e14' },
    { label: 'Срочный', value: 'urgent', color: '#dc3545' }
  ];

  statusOptions = [
    { label: 'К выполнению', value: 'todo', icon: 'pi pi-circle' },
    { label: 'В работе', value: 'in_progress', icon: 'pi pi-play' },
    { label: 'На проверке', value: 'review', icon: 'pi pi-eye' },
    { label: 'Выполнено', value: 'completed', icon: 'pi pi-check' }
  ];

  assigneeOptions = [
    { label: 'Иван Петров', value: 'user1', avatar: 'ИП' },
    { label: 'Анна Смирнова', value: 'user2', avatar: 'АС' },
    { label: 'Мария Иванова', value: 'user3', avatar: 'МИ' },
    { label: 'Алексей Козлов', value: 'user4', avatar: 'АК' }
  ];

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private translate: TranslateService
  ) {
    this.initializeForm();
    this.loadMockData();
  }

  ngOnInit() {
    this.filterTasks();
  }

  private initializeForm() {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      assignee: ['', Validators.required],
      priority: ['medium', Validators.required],
      status: ['todo', Validators.required],
      dueDate: [null, Validators.required],
      estimatedHours: [null],
      tags: [[]]
    });
  }

  private loadMockData() {
    this.tasks = [
      {
        id: '1',
        title: 'Провести техническое собеседование с Алексеем Петровым',
        description: 'Подготовить технические вопросы по React и Node.js, провести интервью в Zoom',
        assignee: 'user2',
        assigneeName: 'Анна Смирнова',
        assigneeAvatar: 'АС',
        priority: 'high',
        status: 'in_progress',
        dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        createdAt: new Date(),
        updatedAt: new Date(),
        tags: ['интервью', 'техническое'],
        estimatedHours: 2,
        relatedTo: {
          type: 'candidate',
          id: 'cand1',
          title: 'Алексей Петров - Senior Frontend Developer'
        }
      },
      {
        id: '2',
        title: 'Подготовить оффер для Марии Ивановой',
        description: 'Составить конкурентоспособное предложение с учетом рыночных ставок',
        assignee: 'user1',
        assigneeName: 'Иван Петров',
        assigneeAvatar: 'ИП',
        priority: 'urgent',
        status: 'todo',
        dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
        createdAt: new Date(),
        updatedAt: new Date(),
        tags: ['оффер', 'переговоры'],
        estimatedHours: 3,
        relatedTo: {
          type: 'candidate',
          id: 'cand2',
          title: 'Мария Иванова - Product Manager'
        }
      },
      {
        id: '3',
        title: 'Обновить описание вакансии Senior Backend Developer',
        description: 'Добавить требования по Kubernetes и обновить стек технологий',
        assignee: 'user4',
        assigneeName: 'Алексей Козлов',
        assigneeAvatar: 'АК',
        priority: 'medium',
        status: 'completed',
        dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(),
        tags: ['вакансия', 'обновление'],
        estimatedHours: 1,
        actualHours: 1.5
      },
      {
        id: '4',
        title: 'Провести анализ эффективности найма за квартал',
        description: 'Собрать метрики, подготовить отчет для руководства',
        assignee: 'user3',
        assigneeName: 'Мария Иванова',
        assigneeAvatar: 'МИ',
        priority: 'medium',
        status: 'review',
        dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        createdAt: new Date(),
        updatedAt: new Date(),
        tags: ['аналитика', 'отчет'],
        estimatedHours: 8
      }
    ];
  }

  filterTasks() {
    let filtered = [...this.tasks];

    switch (this.activeFilter) {
      case 'my':
        filtered = filtered.filter(task => task.assignee === 'user1'); // Текущий пользователь
        break;
      case 'team':
        // Все задачи команды
        break;
      case 'overdue':
        filtered = filtered.filter(task =>
          task.status !== 'completed' &&
          task.dueDate < new Date()
        );
        break;
    }

    this.filteredTasks = filtered;
  }

  setFilter(filter: 'all' | 'my' | 'team' | 'overdue') {
    this.activeFilter = filter;
    this.filterTasks();
  }

  setView(view: 'list' | 'board' | 'calendar') {
    this.activeView = view;
  }

  createTask() {
    this.selectedTask = null;
    this.taskForm.reset({
      priority: 'medium',
      status: 'todo',
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    });
    this.showTaskDialog = true;
  }

  editTask(task: Task) {
    this.selectedTask = task;
    this.taskForm.patchValue({
      title: task.title,
      description: task.description,
      assignee: task.assignee,
      priority: task.priority,
      status: task.status,
      dueDate: task.dueDate,
      estimatedHours: task.estimatedHours,
      tags: task.tags
    });
    this.showTaskDialog = true;
  }

  saveTask() {
    if (this.taskForm.invalid) return;

    const formValue = this.taskForm.value;
    const assignee = this.assigneeOptions.find(a => a.value === formValue.assignee);

    this.isLoading = true;

    setTimeout(() => {
      if (this.selectedTask) {
        this.selectedTask.title = formValue.title;
        this.selectedTask.description = formValue.description;
        this.selectedTask.assignee = formValue.assignee;
        this.selectedTask.assigneeName = assignee?.label || '';
        this.selectedTask.assigneeAvatar = assignee?.avatar || '';
        this.selectedTask.priority = formValue.priority;
        this.selectedTask.status = formValue.status;
        this.selectedTask.dueDate = formValue.dueDate;
        this.selectedTask.estimatedHours = formValue.estimatedHours;
        this.selectedTask.tags = formValue.tags;
        this.selectedTask.updatedAt = new Date();

        this.messageService.add({
          severity: 'success',
          summary: 'Задача обновлена'
        });
      } else {
        const newTask: Task = {
          id: Date.now().toString(),
          title: formValue.title,
          description: formValue.description,
          assignee: formValue.assignee,
          assigneeName: assignee?.label || '',
          assigneeAvatar: assignee?.avatar || '',
          priority: formValue.priority,
          status: formValue.status,
          dueDate: formValue.dueDate,
          createdAt: new Date(),
          updatedAt: new Date(),
          tags: formValue.tags,
          estimatedHours: formValue.estimatedHours
        };

        this.tasks.push(newTask);
        this.messageService.add({
          severity: 'success',
          summary: 'Задача создана'
        });
      }

      this.filterTasks();
      this.showTaskDialog = false;
      this.isLoading = false;
    }, 1000);
  }

  deleteTask(task: Task) {
    this.tasks = this.tasks.filter(t => t.id !== task.id);
    this.filterTasks();
    this.messageService.add({
      severity: 'success',
      summary: 'Задача удалена'
    });
  }

  updateTaskStatus(task: Task, newStatus: Task['status']) {
    task.status = newStatus;
    task.updatedAt = new Date();
    this.filterTasks();
  }

  getTaskStats(): TaskStats {
    const total = this.tasks.length;
    const completed = this.tasks.filter(t => t.status === 'completed').length;
    const inProgress = this.tasks.filter(t => t.status === 'in_progress').length;
    const overdue = this.tasks.filter(t =>
      t.status !== 'completed' && t.dueDate < new Date()
    ).length;

    return {
      total,
      completed,
      inProgress,
      overdue,
      completionRate: total > 0 ? Math.round((completed / total) * 100) : 0
    };
  }

  getPriorityColor(priority: string): string {
    const option = this.priorityOptions.find(p => p.value === priority);
    return option?.color || '#6c757d';
  }

  getStatusIcon(status: string): string {
    const option = this.statusOptions.find(s => s.value === status);
    return option?.icon || 'pi pi-circle';
  }

  getStatusLabel(status: string): string {
    const option = this.statusOptions.find(s => s.value === status);
    return option?.label || status;
  }

  isOverdue(task: Task): boolean {
    return task.status !== 'completed' && task.dueDate < new Date();
  }

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  }

  getTasksByStatus(status: string): Task[] {
    return this.filteredTasks.filter(task => task.status === status);
  }

  getPriorityLabel(priority: string): string {
    const option = this.priorityOptions.find(p => p.value === priority);
    return option?.label || priority;
  }
}