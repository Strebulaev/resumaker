import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessageService } from 'primeng/api';
import { UserRoleService } from '../../../shared/auth/user-role.service';
import { UserRole } from '../../../shared/auth/user-role.model';

@Component({
  selector: 'app-role-selection',
  templateUrl: './role-selection.component.html',
  styleUrls: ['./role-selection.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    CardModule,
    DialogModule,
    ProgressSpinnerModule
  ]
})
export class RoleSelectionComponent {
  showDialog = true;
  isLoading = false;
  UserRole = UserRole; // Для доступа к enum в шаблоне

  constructor(
    private userRoleService: UserRoleService,
    private router: Router,
    private messageService: MessageService
  ) {}

  async selectRole(role: UserRole): Promise<void> {
    this.isLoading = true;
    try {
      await this.userRoleService.setUserRole(role);

      this.messageService.add({
        severity: 'success',
        summary: 'Роль выбрана',
        detail: `Вы зарегистрированы как ${role === UserRole.EMPLOYER ? 'работодатель' : 'соискатель'}`
      });

      this.showDialog = false;

      // Перенаправляем в зависимости от роли
      if (role === UserRole.EMPLOYER) {
        this.router.navigate(['/employer/dashboard']);
      } else {
        this.router.navigate(['/applicant/dashboard']);
      }

    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Ошибка',
        detail: 'Не удалось сохранить роль пользователя'
      });
    } finally {
      this.isLoading = false;
    }
  }
}