import { Component, OnInit, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-public-offer',
  templateUrl: './public-offer.component.html',
  styleUrls: ['./public-offer.component.scss', '../../../../styles/legal-pages.common.scss']
})
export class PublicOfferComponent implements OnInit {
  currentYear = new Date().getFullYear();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.setupNavigation();
    }
  }

  @HostListener('window:scroll')
  onScroll() {
    if (isPlatformBrowser(this.platformId)) {
      this.updateActiveNavLink();
    }
  }

  setupNavigation() {
    // Добавляем обработчики для плавной прокрутки
    setTimeout(() => {
      const navLinks = document.querySelectorAll('.nav-link');
      navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const targetId = (e.target as HTMLAnchorElement).getAttribute('href')?.substring(1);
          if (targetId) {
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
              const offsetTop = targetElement.offsetTop - 70;
              window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
              });
            }
          }
        });
      });
    });
  }

  updateActiveNavLink() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
      const sectionElement = section as HTMLElement;
      const sectionTop = sectionElement.offsetTop;
      const sectionHeight = sectionElement.clientHeight;
      if (window.scrollY >= sectionTop - 100 && window.scrollY < sectionTop + sectionHeight - 100) {
        currentSection = section.id;
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  }
}