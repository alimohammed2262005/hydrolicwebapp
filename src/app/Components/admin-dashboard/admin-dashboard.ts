import { Component } from '@angular/core';
import { Spinner } from "../spinner/spinner";
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  imports: [Spinner,CommonModule],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboard {
  constructor(private routing: Router) {}
  projectsoperations() { this.routing.navigate(['/ourprojects']); }
  serviceoperations() { this.routing.navigate(['/ourservices']); }
  servicetypesoperations() { this.routing.navigate(['/ourservicetypes']); }
  projectimagesoperations() { this.routing.navigate(['/adminprojectimages']); }
}