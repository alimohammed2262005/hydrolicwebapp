import { Component, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-our-values',
  imports: [],
  templateUrl: './our-values.html',
  styleUrl: './our-values.css',
})
export class OurValues implements AfterViewInit, OnDestroy {
  private observer?: IntersectionObserver;

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.initCounterAnimation();
    }, 100);
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private initCounterAnimation(): void {
    const counters = document.querySelectorAll('.counter');
    
    if (!counters.length) {
      return;
    }

    const speed = 200;

    const animateCounter = (counter: Element) => {
      const target = +(counter.getAttribute('data-target') || 0);
      const increment = target / speed;

      const updateCount = () => {
        const count = +(counter.textContent || 0);

        if (count < target) {
          counter.textContent = Math.ceil(count + increment).toString();
          setTimeout(updateCount, 10);
        } else {
          counter.textContent = target.toString();
        }
      };

      updateCount();
    };

    const observerOptions: IntersectionObserverInit = {
      threshold: 0.3,
      rootMargin: '0px'
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target.querySelector('.counter');
          if (counter && counter.textContent === '0') {
            setTimeout(() => animateCounter(counter), 200);
          }
        }
      });
    }, observerOptions);

    document.querySelectorAll('.stat-card').forEach(card => {
      this.observer?.observe(card);
    });
  }
}