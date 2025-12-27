import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-personal-data-consent',
  templateUrl: './personal-data-consent.component.html',
  styleUrls: ['./personal-data-consent.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class PersonalDataConsentComponent implements OnInit {
  showConsentModal = false;
  consentGiven = false;

  ngOnInit() {
    // Проверяем, давал ли пользователь уже согласие
    const consentGiven = localStorage.getItem('personal_data_consent');
    if (!consentGiven) {
      // Показываем модальное окно через 2 секунды после загрузки
      setTimeout(() => {
        this.showConsentModal = true;
      }, 2000);
    }
  }

  acceptConsent() {
    if (this.consentGiven) {
      localStorage.setItem('personal_data_consent', 'true');
      localStorage.setItem('personal_data_consent_date', new Date().toISOString());
      this.showConsentModal = false;
      
      console.log('User accepted consent to personal data processing');
    }
  }

  declineConsent() {
    localStorage.setItem('personal_data_consent', 'false');
    this.showConsentModal = false;
    
    alert('Without consent to personal data processing, some service functions may be unavailable.');
  }
}