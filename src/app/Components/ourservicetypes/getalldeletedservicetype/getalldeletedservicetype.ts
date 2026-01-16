import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Servicetypes } from '../../../Services/servicetypes';
import { Servicetypesinterface } from '../../../Interfaces/servicetypesinterface';
import { Environment } from '../../../Environment/environment';
import { Spinner } from "../../spinner/spinner";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-getdeletedservicetypes',
  imports: [Spinner, CommonModule],
  standalone: true,
  templateUrl: './getalldeletedservicetype.html',
  styleUrls: ['./getalldeletedservicetype.css'],
})
export class Getdeletedservicetypes implements OnInit {
  environment = Environment.StaticFiles;
  loading = false;
  services: Servicetypesinterface[] = [];
  apiMessage: string = '';
  apiMessageType: 'success' | 'error' = 'success';

  constructor(
    private serviceTypeService: Servicetypes,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.getDeletedServices();
  }

  getDeletedServices() {
    this.loading = true;
    this.serviceTypeService.getalldeletedservicetypes().subscribe({
      next: (res) => {
        this.services = res;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.services =[];

      }
    });
  }
  restoreService(id: number) {
    this.loading = true;
    this.serviceTypeService.restoreservicetypebyid(id).subscribe({
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
    setTimeout(() => this.apiMessage = '', type === 'success' ? 1000 : 5000);
  }
}