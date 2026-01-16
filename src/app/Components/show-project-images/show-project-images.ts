import { Component, OnInit, OnDestroy } from '@angular/core';
import { Spinner } from "../spinner/spinner";
import { ProjectImagesInterface } from '../../Interfaces/project-images-interface';
import { Environment } from '../../Environment/environment';
import { ProjectImagesService } from '../../Services/project-images-service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-show-project-images',
  standalone: true,
  imports: [Spinner, CommonModule],
  templateUrl: './show-project-images.html',
  styleUrls: ['./show-project-images.css'],
})
export class ShowProjectImages implements OnInit, OnDestroy {
  loading: boolean = false;
  projectImages: ProjectImagesInterface[] = [];
  apiMessage: string = '';
  apiMessageType: 'success' | 'error' = 'success';
  environment = Environment.StaticFiles;
  projectId!: number;
  projectName: string = '';
  description: string = '';
  currentIndex: number = 0;
  intervalId: any;

  constructor(
    private projectImagesService: ProjectImagesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.projectId = +params['id'];
      this.getProjectImagesById(this.projectId);
    });
    this.startAutoPlay();
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  getProjectImagesById(id: number) {
    this.loading = true;
    this.projectImagesService.getProjectImagesByProjectId(id).subscribe({
      next: (res) => {
        this.projectImages = res;
        if (res.length > 0) {
          this.projectName = res[0].projectName;
          this.description = res[0].description;
        }
        this.loading = false;
      },
      error: () => {
        this.projectImages = [];
        this.loading = false;
        this.showMessage('حدث خطأ في تحميل الصور', 'error');
      }
    });
  }

  startAutoPlay() {
    this.intervalId = setInterval(() => {
      this.nextImage();
    }, 5000);
  }

  nextImage() {
    if (this.projectImages.length > 0) {
      this.currentIndex = (this.currentIndex + 1) % this.projectImages.length;
    }
  }

  prevImage() {
    if (this.projectImages.length > 0) {
      this.currentIndex = (this.currentIndex - 1 + this.projectImages.length) % this.projectImages.length;
    }
  }

  private showMessage(message: string, type: 'success' | 'error') {
    this.apiMessage = message;
    this.apiMessageType = type;
    setTimeout(() => this.apiMessage = '', type === 'success' ? 2000 : 5000);
  }
}