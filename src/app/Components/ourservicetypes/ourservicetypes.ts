import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Servicetypes } from '../../Services/servicetypes';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Servicetypesinterface } from '../../Interfaces/servicetypesinterface';
import { Spinner } from "../spinner/spinner";
import { Environment } from '../../Environment/environment';
import { Roles } from '../../Services/roles';
import { ServiceTypesstatus } from '../../Services/SubComponents/servicetypesstatus';

@Component({
  selector: 'app-our-services',
  imports: [CommonModule, FormsModule, Spinner],
  standalone: true,
  templateUrl: './ourservicetypes.html',
  styleUrls: ['./ourservicetypes.css']
})
export class OurServiceTypes implements OnInit {
  loading = false;
  services: Servicetypesinterface[] = [];
  hasDeletedServices = false;
  apiMessage = '';
  apiMessageType: 'success' | 'error' = 'success';
  environment = Environment.StaticFiles;

  constructor(
    private serviceTypeService: Servicetypes,
    private routing: ActivatedRoute,
    private router: Router,
    private roles: Roles,
    private serviceTypesStatus: ServiceTypesstatus
  ) {}

  ngOnInit(): void {
    this.getAllServices();
    this.serviceTypesStatus.deletedtables$.subscribe(res => {
      this.hasDeletedServices = res.length > 0;
    });
  }

  getAllServices() {
    this.loading = true;
    this.serviceTypeService.getallservicetypes().subscribe({
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

  deleteServiceById(id: number) {
    this.loading = true;
    this.serviceTypeService.deleteservicetypebyid(id).subscribe({
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
    this.serviceTypeService.getalldeletedservicetypes().subscribe(deleted => {
      this.serviceTypesStatus.setDeletedTables(deleted);
    });
  }

  addServicetype() {
    this.router.navigate(['addservicetype']);
  }

  updateServicetype(id: number) {
    this.router.navigate(['updateservicetype', id]);
  }

  restoreDeletedServicetypes() {
    this.router.navigate(['restoredeletedservicetypes']);
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
