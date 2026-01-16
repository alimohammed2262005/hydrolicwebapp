import { Component } from '@angular/core';
import { Projectinterface } from '../../Interfaces/projectinterface';
import { Environment } from '../../Environment/environment';
import { ProjectServices } from '../../Services/project-services';
import { Router } from '@angular/router';
import { Spinner } from "../spinner/spinner";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-project-images',
  imports: [Spinner, CommonModule],
  templateUrl: './admin-project-images.html',
  styleUrls: ['./admin-project-images.css'],
})
export class AdminProjectImages {
  loading: boolean = false;
  projects: Projectinterface[] = [];
  apiMessage: string = '';
  apiMessageType: 'success' | 'error' = 'success';
  environment = Environment.StaticFiles;

  constructor(
    private projectService: ProjectServices,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllProjects();
  }

  getAllProjects() {
    this.loading = true;
    this.projectService.getallprojects().subscribe({
      next: (res) => {
        this.projects = res;
        this.loading = false;
      },
      error: () => {
        this.projects = [];
        this.loading = false;
      }
    });
  }

  viewProjectImages(projectId: number) {
    this.router.navigate(['/projectimages', projectId]);
  }
  addImage() {
    this.router.navigate(['addprojectimage']);
  }
  private showMessage(message: string, type: 'success' | 'error') {
    this.apiMessage = message;
    this.apiMessageType = type;
    setTimeout(() => this.apiMessage = '', type === 'success' ? 2000 : 5000);
  }
}
