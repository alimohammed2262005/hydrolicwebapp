import { Component } from '@angular/core';
import { ServiceServices } from '../../../Services/service-services';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-updateservice',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './updateservice.html',
  styleUrls: ['./updateservice.css'],
})
export class Updateservice {
  serviceForm!: FormGroup;
  serviceId: number | null = null;
  selectedFile: File | null = null;

  message: string = '';
  messageType: 'success' | 'error' | '' = '';

  constructor(
    private serviceService: ServiceServices,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.serviceId = Number(this.route.snapshot.paramMap.get('id'));
    this.serviceForm = new FormGroup({
      name: new FormControl(''),
      image: new FormControl(null)
    });
  }

  onFileSelect(event: any) {
    this.selectedFile = event.target.files.length > 0 ? event.target.files[0] : null;
    if (this.selectedFile) {
      this.serviceForm.get('image')?.setValue(this.selectedFile);
    }
  }

  submit() {
    if (!this.serviceId) return;

    const formData = new FormData();

    if (this.serviceForm.value.name) formData.append('Name', this.serviceForm.value.name);
    if (this.selectedFile) formData.append('Image', this.selectedFile, this.selectedFile.name);

    if (formData.keys().next().done) {
      this.showMessage('لم يتم تعديل أي حقل', 'error');
      return;
    }

    this.serviceService.updateservicebyid(this.serviceId, formData).subscribe({
      next: res => {
        this.showMessage(res, 'success');
        setTimeout(() => {
          this.router.navigate(['/ourservices']);
        }, 1000);
      },
      error: err => this.showMessage(err.error, 'error')
    });
  }

  private showMessage(msg: string, type: 'success' | 'error') {
    this.message = msg;
    this.messageType = type;
    setTimeout(() => {
      this.message = '';
      this.messageType = '';
    }, 5000);
  }

  get name() { return this.serviceForm.get('name'); }
  get image() { return this.serviceForm.get('image'); }
}
