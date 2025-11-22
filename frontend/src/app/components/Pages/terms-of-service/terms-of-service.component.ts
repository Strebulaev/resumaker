import { Component } from '@angular/core';

@Component({
  selector: 'app-terms-of-service',
  templateUrl: './terms-of-service.component.html',
  styleUrls: ['./terms-of-service.component.scss', '../../../../styles/legal-pages.common.scss']
})
export class TermsOfServiceComponent {
  currentYear: number = new Date().getFullYear();
}