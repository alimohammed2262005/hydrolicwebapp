import { Component, OnInit, AfterViewInit, OnDestroy, HostListener } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ServiceServices } from '../../Services/service-services';
import { Serviceinterface } from '../../Interfaces/serviceinterface';
import { Environment } from '../../Environment/environment';
import { Roles } from '../../Services/roles';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnInit, AfterViewInit, OnDestroy {
  currentSlide = 0;
  totalSlides = 3;
  sliderInterval: any;
  slideDuration = 5000;
  isAnimating = false;
  isMenuOpen = false;
  isScrolled = false;
  services!: Serviceinterface[];
  currentGalleryGroup = 0;
  totalGalleryGroups = 3;
  galleryInterval: any;
  itemsPerPage = 3;
  environment = Environment.StaticFiles;
  private cachedElements = {
    slider: null as HTMLElement | null,
    navbar: null as HTMLElement | null,
    topBar: null as HTMLElement | null,
    serviceCards: [] as HTMLElement[],
    statCards: [] as HTMLElement[],
    galleryItems: [] as HTMLElement[],
    ctaElements: [] as HTMLElement[]
  };

  constructor(private router: Router, private http: ServiceServices, private roles: Roles) {}

  ngOnInit(): void {
    this.roles.setAuthStatus(this.roles.isAuthenticated());
    this.checkScreenSize();
    this.startAutoSlide();
    this.startGalleryRotation();
    this.getservices();
    
    setInterval(() => {
      if (!this.sliderInterval) {
        this.startAutoSlide();
      }
    }, 1000);
  }

  getservices(): void {
    this.http.getallservices().subscribe(res => this.services = res);
  }

  ngAfterViewInit(): void {
    this.cacheElements();
    this.setupScrollAnimations();
    this.updateGalleryDisplay();
  }

  ngOnDestroy(): void {
    clearInterval(this.sliderInterval);
    clearInterval(this.galleryInterval);
    document.body.style.overflow = '';
  }

  cacheElements(): void {
    this.cachedElements.slider = document.querySelector('.slider-container');
    this.cachedElements.navbar = document.querySelector('.main-navbar');
    this.cachedElements.topBar = document.querySelector('.top-bar');
    this.cachedElements.serviceCards = Array.from(document.querySelectorAll('.service-card')) as HTMLElement[];
    this.cachedElements.statCards = Array.from(document.querySelectorAll('.stat-card')) as HTMLElement[];
    this.cachedElements.galleryItems = Array.from(document.querySelectorAll('.gallery-item')) as HTMLElement[];
    this.cachedElements.ctaElements = Array.from(document.querySelectorAll('.cta-title, .cta-button')) as HTMLElement[];
  }

  setupScrollAnimations(): void {
    const sections = document.querySelectorAll(
      '.about-section, .section-title, .about-text, .about-image, .subtitle, .section-underline, .services-section, .stats-section, .gallery-section, .cta-section, .footer'
    );
    sections.forEach(el => {
      (el as HTMLElement).style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      (el as HTMLElement).style.opacity = '0';
      (el as HTMLElement).style.transform = 'translateY(20px)';
    });
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const el = entry.target as HTMLElement;
        if (entry.isIntersecting) this.animateElementIn(el);
        else this.animateElementOut(el);
      });
    }, { threshold: 0.2 });
    sections.forEach(sec => observer.observe(sec));
  }

  private animateElementIn(el: HTMLElement): void {
    el.style.opacity = '1';
    el.style.transform = 'translateY(0)';
    if (el.classList.contains('services-section')) this.animateCards(this.cachedElements.serviceCards, 120);
    if (el.classList.contains('stats-section')) this.animateCards(this.cachedElements.statCards, 120);
    if (el.classList.contains('gallery-section')) this.animateCards(Array.from(document.querySelectorAll('.gallery-item.active')) as HTMLElement[], 150);
    if (el.classList.contains('cta-section')) this.cachedElements.ctaElements.forEach(child => {
      child.style.opacity = '1';
      child.style.transform = 'translateY(0)';
    });
    if (el.classList.contains('footer')) el.style.opacity = '1';
  }

  private animateElementOut(el: HTMLElement): void {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    if (el.classList.contains('services-section')) this.cachedElements.serviceCards.forEach(card => { card.style.opacity = '0'; });
    if (el.classList.contains('stats-section')) this.cachedElements.statCards.forEach(stat => { stat.style.opacity = '0'; });
    if (el.classList.contains('gallery-section')) document.querySelectorAll('.gallery-item.active').forEach(item => (item as HTMLElement).style.opacity = '0');
    if (el.classList.contains('cta-section')) this.cachedElements.ctaElements.forEach(child => child.style.opacity = '0');
    if (el.classList.contains('footer')) el.style.opacity = '0';
  }

  private animateCards(cards: HTMLElement[], delay: number): void {
    cards.forEach((card, i) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, i * delay);
    });
  }

  @HostListener('window:resize') 
  onResize(): void { this.checkScreenSize(); }

  @HostListener('window:scroll') 
  onScroll(): void {
    const s = window.pageYOffset;
    this.isScrolled = s > 50;
    if (this.cachedElements.slider) this.cachedElements.slider.style.transform = `translateY(${s * 0.5}px)`;
    if (this.cachedElements.navbar) {
      if (s > 100) this.cachedElements.navbar.classList.add('scrolled');
      else this.cachedElements.navbar.classList.remove('scrolled');
    }
  }

  checkScreenSize(): void {
    const totalItems = 9;
    this.itemsPerPage = window.innerWidth <= 768 ? 1 : 3;
    this.totalGalleryGroups = window.innerWidth <= 768 ? totalItems : Math.ceil(totalItems / this.itemsPerPage);
    if (this.currentGalleryGroup >= this.totalGalleryGroups) this.currentGalleryGroup = 0;
    this.updateGalleryDisplay();
  }

  navigateToHome(): void { this.router.navigate(['/home']).then(() => window.location.reload()); }
  navigateToSection(sectionId: string): void { const element = document.getElementById(sectionId); if (element) { element.scrollIntoView({ behavior: 'smooth', block: 'start' }); this.onItemClick(); } }
  navigateToValues(): void { this.router.navigate(['/ourvalues']); this.onItemClick(); }
  navigateToProjects(): void { this.router.navigate(['/showprojects']); this.onItemClick(); }
  LogOut(): void { this.roles.setAuthStatus(false); localStorage.clear(); this.onItemClick(); this.router.navigate(['/home']); }
  navigateLogIn(): void { this.router.navigate(['/login']); this.onItemClick(); }
  navigateDashboard(): void { this.router.navigate(['/dashboard']); this.onItemClick(); }
  getservicetypesbyserviceid(id: number): void { this.router.navigate(['showservicetypes', id]); }

  get isAuth(): boolean { return this.roles.isAuthenticated(); }
  get isAdmin(): boolean { return this.roles.isAdmin(); }
  get isCustomer(): boolean { return this.roles.isCustomer(); }

  startAutoSlide(): void { 
    clearInterval(this.sliderInterval);
    this.sliderInterval = setInterval(() => this.nextSlide(), this.slideDuration); 
  }
  
  pauseSlider(): void {}
  resumeSlider(): void {}
  resetAutoSlide(): void {}

  nextSlide(): void { this.changeSlide((this.currentSlide + 1) % this.totalSlides); }
  prevSlide(): void { this.changeSlide(this.currentSlide === 0 ? this.totalSlides - 1 : this.currentSlide - 1); }
  goToSlide(i: number): void { this.changeSlide(i); }

  private changeSlide(index: number): void {
    if (this.isAnimating || index === this.currentSlide) return;
    this.isAnimating = true;
    const slides = document.querySelectorAll('.slide') as NodeListOf<HTMLElement>;
    slides.forEach(slide => {
      slide.classList.remove('active');
      void slide.offsetWidth;
    });
    this.currentSlide = index;
    slides[this.currentSlide].classList.add('active');
    setTimeout(() => this.isAnimating = false, 1200);
  }

  startGalleryRotation(): void { clearInterval(this.galleryInterval); this.galleryInterval = setInterval(() => this.nextGalleryGroup(), 4000); }
  nextGalleryGroup(): void { this.currentGalleryGroup = (this.currentGalleryGroup + 1) % this.totalGalleryGroups; this.updateGalleryDisplay(); }
  prevGalleryGroup(): void { this.currentGalleryGroup = this.currentGalleryGroup === 0 ? this.totalGalleryGroups - 1 : this.currentGalleryGroup - 1; this.updateGalleryDisplay(); }
  goToGalleryGroup(i: number): void { this.currentGalleryGroup = i; this.updateGalleryDisplay(); this.resetGalleryRotation(); }
  updateGalleryDisplay(): void {
    const items = document.querySelectorAll('.gallery-item') as NodeListOf<HTMLElement>;
    if (!items.length) return;
    items.forEach(i => { i.style.display = 'none'; i.classList.remove('active'); });
    const start = this.currentGalleryGroup * this.itemsPerPage;
    for (let i = start; i < start + this.itemsPerPage && i < items.length; i++) {
      items[i].style.display = 'block';
      setTimeout(() => items[i].classList.add('active'), 50);
    }
    const indicators = document.querySelectorAll('.gallery-indicators .indicator');
    indicators.forEach(ind => ind.classList.remove('active'));
    if (indicators[this.currentGalleryGroup]) indicators[this.currentGalleryGroup].classList.add('active');
  }
  resetGalleryRotation(): void { clearInterval(this.galleryInterval); this.startGalleryRotation(); }

  toggleMenu(event?: Event): void { if (event) event.stopPropagation(); this.isMenuOpen = !this.isMenuOpen; document.body.style.overflow = this.isMenuOpen ? 'hidden' : ''; }
  onItemClick(): void { this.isMenuOpen = false; document.body.style.overflow = ''; }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    if (this.isMenuOpen && !target.closest('.nav-menu') && !target.closest('.mobile-menu-btn')) this.onItemClick();
  }
}