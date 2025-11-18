import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing-module';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { ProfileViewComponent } from './profile-view/profile-view.component';
import { AvatarModule } from 'primeng/avatar';
import { CheckboxModule } from 'primeng/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import { ProgressBarModule } from 'primeng/progressbar';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ResumeManagementComponent } from '../../Helpers/resume-management/resume-management.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';

@NgModule({
  declarations: [
    ProfileEditComponent,
    ProfileViewComponent
  ],
  imports: [
    CommonModule,
    AvatarModule,
    CheckboxModule,
    ProfileRoutingModule,
    TranslatePipe,
    ReactiveFormsModule,
    TranslateModule,
    ProgressBarModule,
    SelectModule,
    DatePickerModule,
    ProgressSpinnerModule,
    ButtonModule,
    TranslatePipe,
    FileUploadModule,
    InputTextModule,
    InputNumberModule,
    ButtonModule,
    CardModule,
    PanelModule,
    DialogModule,
    DividerModule,
    ProgressBarModule,
    CheckboxModule,
    SelectButtonModule,
    SelectModule,
    DatePickerModule,
    ResumeManagementComponent
]
})
export class ProfileModule { }
