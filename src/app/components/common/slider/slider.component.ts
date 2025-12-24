import {AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})

export class SliderComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('carouselContainer', {static: false}) public carouselContainer!: ElementRef;

  public slides = [
    {img: 'assets/images/img_1.png', alt: 'tea_1'},
    {img: 'assets/images/img_2.png', alt: 'tea_2'},
    {img: 'assets/images/img_3.png', alt: 'tea_3'}
  ];

  public currentSlide: number = 0;
  public isMobile: boolean = false;
  private autoPlayInterval: any;
  private touchStartX: number = 0;
  private touchEndX: number = 0;
  private readonly minSwipeDistance: number = 50;

  public ngOnInit(): void {
    this.checkIfMobile();
    this.startAutoPlay();
  }

  public ngAfterViewInit(): void {
    this.initTouchEvents();
  }

  public ngOnDestroy(): void {
    this.stopAutoPlay();
  }

  @HostListener('window:resize', ['$event'])
  public onResize(): void {
    this.checkIfMobile();
  }

  public nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  public prevSlide(): void {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
  }

  public goToSlide(index: number): void {
    this.currentSlide = index;
  }

  public startAutoPlay(): void {
    this.autoPlayInterval = setInterval((): void => {
      this.nextSlide();
    }, 30000);
  }

  public stopAutoPlay(): void {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
    }
  }

  private checkIfMobile(): void {
    this.isMobile = window.innerWidth <= 767;
  }

  private initTouchEvents(): void {
    const container = this.carouselContainer.nativeElement;

    container.addEventListener('touchstart', (e: TouchEvent) => {
      this.touchStartX = e.changedTouches[0].screenX;
    }, {passive: true});

    container.addEventListener('touchend', (e: TouchEvent) => {
      this.touchEndX = e.changedTouches[0].screenX;
      this.handleSwipe();
    }, {passive: true});
  }

  private handleSwipe(): void {
    const swipeDistance: number = this.touchEndX - this.touchStartX;

    if (Math.abs(swipeDistance) < this.minSwipeDistance) {
      return;
    }

    if (swipeDistance > 0) {
      this.prevSlide();
    } else {
      this.nextSlide();
    }
  }
}
