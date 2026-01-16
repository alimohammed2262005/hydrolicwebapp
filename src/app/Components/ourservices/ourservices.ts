import { Component, OnInit } from '@angular/core';
import { ServiceServices } from '../../Services/service-services';
import { ActivatedRoute, Router } from '@angular/router';
import { Environment } from '../../Environment/environment';
import { Serviceinterface } from '../../Interfaces/serviceinterface';
import { CommonModule } from '@angular/common';
import { Roles } from '../../Services/roles';
import { Spinner } from "../spinner/spinner";
import { Servicestatus } from '../../Services/SubComponents/servicestatus';

@Component({
  selector: 'app-ourservices',
  standalone: true,
  imports: [CommonModule, Spinner],
  templateUrl: './ourservices.html',
  styleUrls: ['./ourservices.css'],
})
export class Ourservices implements OnInit {
  loading = false;
  services: Serviceinterface[] = [];
  hasDeletedServices = false;
  apiMessage = '';
  apiMessageType: 'success' | 'error' = 'success';
  environment = Environment.StaticFiles;

  constructor(
    private serviceServices: ServiceServices,
    private routing: ActivatedRoute,
    private router: Router,
    private roles: Roles,
    private serviceStatus: Servicestatus
  ) {}

  ngOnInit(): void {
    this.getAllServices();
    this.serviceStatus.deletedServices$.subscribe(res => {
      this.hasDeletedServices = res.length > 0;
    });
  }

  getAllServices() {
    this.loading = true;
    this.serviceServices.getallservices().subscribe({
      next: res => {
        this.services = res;
        this.loading = false;
      },
      error: () => {
        this.services = [];
        this.loading = false;
      }
    });
  }

  deleteservice(id: number) {
    this.loading = true;
    this.serviceServices.deleteservicebyid(id).subscribe({
      next: res => {
        this.updateDeletedServices();
        this.getAllServices();
        this.showApiMessage(res, 'success');
        this.loading = false;
      },
      error: err => {
        this.showApiMessage(err.error || 'حدث خطأ', 'error', 5000);
        this.loading = false;
      }
    });
  }

  private updateDeletedServices() {
    this.serviceServices.getalldeletedservices().subscribe(deleted => {
      this.serviceStatus.setDeletedServices(deleted);
    });
  }

  addservice() {
    this.router.navigate(['addservice']);
  }

  updateservice(id: number) {
    this.router.navigate(['updateservice', id]);
  }

  deletedservicebyid(id: number) {
    this.deleteservice(id);
  }

  restoredeletedservices() {
    this.router.navigate(['restoredeletedservices']);
  }

  get isAdmin() {
    return this.roles.isAdmin();
  }

  get isAuth() {
    return this.roles.isAuthenticated();
  }

  private showApiMessage(message: string, type: 'success' | 'error', timeout: number = 2000) {
    this.apiMessage = message;
    this.apiMessageType = type;
    setTimeout(() => this.apiMessage = '', timeout);
  }
}
