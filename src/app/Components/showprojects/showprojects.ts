import { Component } from '@angular/core';
import { Spinner } from "../spinner/spinner";
import { Projectinterface } from '../../Interfaces/projectinterface';
import { Environment } from '../../Environment/environment';
import { ProjectServices } from '../../Services/project-services';
import { ActivatedRoute, Router } from '@angular/router';
import { Roles } from '../../Services/roles';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-showprojects',
  imports: [Spinner,CommonModule],
  templateUrl: './showprojects.html',
  styleUrl: './showprojects.css',
})
export class Showprojects {
 loading: boolean = false;
  projects: Projectinterface[] = [];
  deletedProjects: Projectinterface[] = [];
  apiMessage: string = '';
  apiMessageType: 'success' | 'error' = 'success';
  environment = Environment.StaticFiles;
  constructor(
    private projectService: ProjectServices,
    private routing: ActivatedRoute,
    private router: Router,private roles: Roles
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
      error: (err) => {
        this.projects = [];
        this.loading = false;
      }
    });
  }
    viewProjectDetails(projectId: number) {
    this.router.navigate(['/showprojectimages', projectId]);
  }
  private showMessage(message: string, type: 'success' | 'error') {
    this.apiMessage = message;
    this.apiMessageType = type;
    setTimeout(() => this.apiMessage = '', type === 'success' ? 2000 : 5000);
  }
  
}
