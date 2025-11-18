import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { SupabaseService } from '../../../shared/db/supabase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    TranslatePipe,
    RouterModule,
    ButtonModule
  ]
})
export class HomeComponent {
  constructor(public supabase: SupabaseService) {}
}