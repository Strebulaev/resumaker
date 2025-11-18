import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.html',
  styleUrls: ['./about.scss'],
  standalone: false,
})
export class About {
  ngOnInit() {
    this.updateMetaTags();
  }

  private updateMetaTags() {
    document.title = 'Rezulution';
  }
}