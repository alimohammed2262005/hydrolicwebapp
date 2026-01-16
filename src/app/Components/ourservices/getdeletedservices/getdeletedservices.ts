import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceServices } from '../../../Services/service-services';
import { Serviceinterface } from '../../../Interfaces/serviceinterface';
import { Environment } from '../../../Environment/environment';
import { Spinner } from "../../spinner/spinner";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-getdeletedservices',
  imports: [Spinner, CommonModule],
  standalone: true,
  templateUrl: './getdeletedservices.html',
  styleUrls: ['./getdeletedservices.css'],
})
export class Getdeletedservices implements OnInit {
  environment = Environment.StaticFiles;
  loading = false;
  services: Serviceinterface[] = [];
  apiMessage: string = '';
  apiMessageType: 'success' | 'error' = 'success';

  constructor(
    private servicesService: ServiceServices,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getdeletedservices();
  }

  getdeletedservices() {
    this.loading = true;
    this.servicesService.getalldeletedservices().subscribe({
      next: (res) => {
        this.services = res;
        this.loading = false;
      },
      error: (err) => {
        this.services=[]
        this.loading = false;
      }
    });
  }

  restoreservice(id: number) {
    this.loading = true;
    this.servicesService.restoreservicebyid(id).subscribe({
      next: (res) => {
        this.showMessage(res, 'success');
        this.services = this.services.filter(s => s.id !== id);
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
    setTimeout(() => this.apiMessage = '', type === 'success' ? 2000 : 5000);
  }
}