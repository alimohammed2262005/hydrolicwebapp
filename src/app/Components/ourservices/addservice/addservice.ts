import { Component } from '@angular/core';
import { ServiceServices } from '../../../Services/service-services';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-addservice',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './addservice.html',
  styleUrls: ['./addservice.css'],
})
export class Addservice {
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
      name: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z\u0621-\u064A ]+$')]),
      image: new FormControl(null, [Validators.required])
    });
  }

  onFileSelect(event: any) {
    this.selectedFile = event.target.files.length > 0 ? event.target.files[0] : null;
    this.serviceForm.get('image')!.setValue(this.selectedFile);
  }

  submit() {
    if (this.serviceForm.invalid) {
      this.serviceForm.markAllAsTouched();
      return;
    }

    if (!this.selectedFile) {
      this.showMessage('يرجى اختيار صورة للخدمة', 'error');
      return;
    }

    const formData = new FormData();
    formData.append('Name', this.serviceForm.value.name);
    formData.append('Image', this.selectedFile, this.selectedFile.name);

    this.serviceService.addservice(formData).subscribe({
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
