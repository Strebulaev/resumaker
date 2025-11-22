import { Component } from '@angular/core';

@Component({
  selector: 'app-requisites-page',
  imports: [],
  templateUrl: './requisites-page.component.html',
  styleUrls: ['./requisites-page.component.scss', '../../../../styles/legal-pages.common.scss']
})
export class RequisitesPageComponent {
  currentYear: number = new Date().getFullYear();
}
