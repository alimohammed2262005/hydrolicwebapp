import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectImagesService } from '../../../Services/project-images-service';
import { ProjectImagesInterface } from '../../../Interfaces/project-images-interface';
import { Environment } from '../../../Environment/environment';
import { Spinner } from "../../spinner/spinner";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-getdeletedprojectsimages',
  imports: [Spinner, CommonModule],
  standalone: true,
  templateUrl: './getdeletedprojectsimages.html',
  styleUrls: ['./getdeletedprojectsimages.css'],
})
export class Getdeletedprojectsimages implements OnInit {
  environment = Environment.StaticFiles;
  loading = false;
  projectImages: ProjectImagesInterface[] = [];
  apiMessage: string = '';
  apiMessageType: 'success' | 'error' = 'success';

  constructor(
    private projectImagesService: ProjectImagesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getDeletedProjectImages();
  }

  getDeletedProjectImages() {
    this.loading = true;
    this.projectImagesService.getAllDeletedProjectImages().subscribe({
      next: (res) => {
        this.projectImages = res;
        this.loading = false;
      },
      error: (err) => {
        this.projectImages = [];
        this.loading = false;
      }
    });
  }

  restoreImage(id: number) {
    this.loading = true;
    this.projectImagesService.restoreProjectImageById(id).subscribe({
      next: (res) => {
        this.showMessage(res, 'success');
        this.projectImages = this.projectImages.filter(img => img.id !== id);
        this.loading = false;
      },
      error: (err) => {
        this.showMessage(err.error || 'حدث خطأ أثناء الاستعادة', 'error');
        this.loading = false;
      }
    });
  }

  private showMessage(message: string, type: 'success' | 'error') {
    this.apiMessage = message;
    this.apiMessageType = type;
    setTimeout(() => this.apiMessage = '', type === 'success' ? 1000 : 5000);
  }
}
