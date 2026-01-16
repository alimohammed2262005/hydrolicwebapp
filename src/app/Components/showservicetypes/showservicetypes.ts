import { Component, OnInit } from '@angular/core';
import { Spinner } from "../spinner/spinner";
import { Servicetypesinterface } from '../../Interfaces/servicetypesinterface';
import { Environment } from '../../Environment/environment';
import { Servicetypes } from '../../Services/servicetypes';
import { ActivatedRoute, Router } from '@angular/router';
import { Roles } from '../../Services/roles';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-showservicetypes',
  imports: [Spinner, CommonModule],
  templateUrl: './showservicetypes.html',
  styleUrls: ['./showservicetypes.css'],
})
export class Showservicetypes implements OnInit {
  loading: boolean = false;
  services: Servicetypesinterface[] = [];
  deletedServices: Servicetypesinterface[] = [];
  apiMessage: string = '';
  apiMessageType: 'success' | 'error' = 'success';
  environment = Environment.StaticFiles;
  serviceId!: number;

  constructor(
    private serviceTypeService: Servicetypes,
    private routing: ActivatedRoute,
    private router: Router,
    private roles: Roles
  ) {}

  ngOnInit(): void {
    this.routing.params.subscribe(params => {
      this.serviceId = +params['id'];
      console.log('Service ID from URL:', this.serviceId);
      
      if (this.serviceId) {
        this.getServiceTypesByServiceId();
      } else {
        this.getAllServices();
      }
    });
  }

  getServiceTypesByServiceId() {
    this.loading = true;
    this.serviceTypeService.getservicetypesbyserviceid(this.serviceId).subscribe({
      next: (res: any) => {
        this.services = Array.isArray(res) ? res : [res];
        this.loading = false;
        console.log('Service Types:', this.services);
      },
      error: (err) => {
        this.services = [];
        this.loading = false;
        this.showMessage(err.error || 'حدث خطأ أثناء جلب الخدمات', 'error');
      }
    });
  }

  getAllServices() {
    this.loading = true;
    this.serviceTypeService.getallservicetypes().subscribe({
      next: (res) => {
        this.services = res;
        this.loading = false;
      },
      error: (err) => {
        this.services = [];
        this.loading = false;
        this.showMessage(err.error || 'حدث خطأ أثناء جلب الخدمات', 'error');
      }
    });
  }

  private showMessage(message: string, type: 'success' | 'error') {
    this.apiMessage = message;
    this.apiMessageType = type;
    setTimeout(() => this.apiMessage = '', type === 'success' ? 2000 : 5000);
  }
}