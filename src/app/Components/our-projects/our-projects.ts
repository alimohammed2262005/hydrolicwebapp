import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectServices } from '../../Services/project-services';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Projectinterface } from '../../Interfaces/projectinterface';
import { Spinner } from "../spinner/spinner";
import { Environment } from '../../Environment/environment';
import { Roles } from '../../Services/roles';
import { Projectstatus } from '../../Services/SubComponents/projectstatus';

@Component({
  selector: 'app-our-projects',
  imports: [CommonModule, FormsModule, Spinner],
  standalone: true,
  templateUrl: './our-projects.html',
  styleUrls: ['./our-projects.css']
})
export class OurProjects implements OnInit {
  loading = false;
  projects: Projectinterface[] = [];
  hasDeletedProjects = false;
  apiMessage = '';
  apiMessageType: 'success' | 'error' = 'success';
  environment = Environment.StaticFiles;

  constructor(
    private projectService: ProjectServices,
    private routing: ActivatedRoute,
    private router: Router,
    private roles: Roles,
    private projectStatus: Projectstatus
  ) {}

  ngOnInit(): void {
    this.getAllProjects();
    this.projectStatus.deletedprojects$.subscribe(res => {
      this.hasDeletedProjects = res.length > 0;
    });
  }

  getAllProjects() {
    this.loading = true;
    this.projectService.getallprojects().subscribe({
      next: res => {
        this.projects = res;
        this.loading = false;
      },
      error: () => {
        this.projects = [];
        this.loading = false;
      }
    });
  }

  deleteproject(id: number) {
    this.loading = true;
    this.projectService.deleteprojectbyid(id).subscribe({
      next: res => {
        this.showApiMessage(res, 'success');
        this.updateDeletedProjects();
        this.getAllProjects();
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  restoredeletedprojects() {
    this.router.navigate(['restoredeletedprojects']);
  }

  private updateDeletedProjects() {
    this.projectService.getalldeletedprojects().subscribe(deleted => {
      this.projectStatus.setDeletedProjects(deleted);
    });
  }

  deletedprojectbyid(id: number) {
    this.deleteproject(id);
  }

  addproject() {
    this.router.navigate(['addproject']);
  }

  updateproject(id: number) {
    this.router.navigate(['updateproject', id]);
  }

  get isAdmin() {
    return this.roles.isAdmin();
  }

  get isAuth() {
    return this.roles.isAuthenticated();
  }

  private showApiMessage(message: string, type: 'success' | 'error') {
    this.apiMessage = message;
    this.apiMessageType = type;
    setTimeout(() => this.apiMessage = '', 2000);
  }
}
