import { Directive, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../utils/language.service';
import { Subscription } from 'rxjs';

@Directive({
  selector: 'input[type="file"][translate]',
  standalone: true
})
export class TranslateFileInputDirective implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  constructor(
    private el: ElementRef<HTMLInputElement>,
    private translate: TranslateService,
    private languageService: LanguageService
  ) {}

  ngOnInit() {
    this.updatePlaceholder();
    
    this.subscriptions.push(
      this.languageService.languageChanges$.subscribe(() => {
        this.updatePlaceholder();
      })
    );
  }

  private updatePlaceholder() {
    const currentLang = this.languageService.getCurrentLanguage();
    
    if (currentLang === 'ru') {
      this.el.nativeElement.setAttribute('placeholder', 'No file chosen');
    } else {
      this.el.nativeElement.setAttribute('placeholder', 'No file chosen');
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}