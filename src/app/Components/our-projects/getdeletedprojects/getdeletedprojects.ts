import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectServices } from '../../../Services/project-services';
import { Projectinterface } from '../../../Interfaces/projectinterface';
import { Environment } from '../../../Environment/environment';
import { Spinner } from "../../spinner/spinner";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-getdeletedprojects',
  imports: [Spinner, CommonModule],
  standalone: true,
  templateUrl: './getdeletedprojects.html',
  styleUrls: ['./getdeletedprojects.css'],
})
export class Getdeletedprojects implements OnInit {
  environment = Environment.StaticFiles;
  loading = false;
  projects: Projectinterface[] = [];
  apiMessage: string = '';
  apiMessageType: 'success' | 'error' = 'success';

  constructor(
    private projectservices: ProjectServices,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.getdeletedprojects();
  }

  getdeletedprojects() {
    this.loading = true;
    this.projectservices.getalldeletedprojects().subscribe({
      next: (res) => {
        this.projects = res;
        this.loading = false;
      },
      error: (err) => {
        this.projects=[]
        this.loading = false;
      }
    });
  }

  restoreproject(id: number) {
    this.loading = true;
    this.projectservices.restoreprojectbyid(id).subscribe({
      next: (res) => {
        this.showMessage(res, 'success');
        this.projects = this.projects.filter(p => p.id !== id);
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
