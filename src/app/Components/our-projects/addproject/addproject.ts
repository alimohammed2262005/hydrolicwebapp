import { Component } from '@angular/core';
import { ProjectServices } from '../../../Services/project-services';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-addproject',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './addproject.html',
  styleUrls: ['./addproject.css'],
})
export class Addproject {
  projectForm!: FormGroup;
  projectId: number | null = null;
  selectedFile: File | null = null;
  message: string = '';
  messageType: 'success' | 'error' | '' = '';
  constructor(
    private projectService: ProjectServices,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.projectId = Number(this.route.snapshot.paramMap.get('id'));
    this.projectForm = new FormGroup({
      projectName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z\u0621-\u064A ]+$')]),
      projectDescription: new FormControl('', [Validators.required]),
      projectType: new FormControl('', [Validators.required]),
      projectImage: new FormControl(null, [Validators.required])
    });
  }
  onFileSelect(event: any) {
    this.selectedFile = event.target.files.length > 0 ? event.target.files[0] : null;
    this.projectForm.get('projectImage')!.setValue(this.selectedFile);
  }
  submit() {
    if (this.projectForm.invalid) {
      this.projectForm.markAllAsTouched();
      return;
    }
    if (!this.selectedFile) {
      this.showMessage('يرجى اختيار صورة للمشروع', 'error');
      return;
    }
    const formData = new FormData();
    formData.append('Name', this.projectForm.value.projectName);
    formData.append('Description', this.projectForm.value.projectDescription);
    formData.append('Type', this.projectForm.value.projectType);
    formData.append('Image', this.selectedFile, this.selectedFile.name);
this.projectService.addproject(formData).subscribe({
  next: res => {
    this.showMessage(res, 'success');
    setTimeout(() => {
      this.router.navigate(['/ourprojects']);
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
  get projectName() { return this.projectForm.get('projectName'); }
  get projectDescription() { return this.projectForm.get('projectDescription'); }
  get projectType() { return this.projectForm.get('projectType'); }
  get projectImage() { return this.projectForm.get('projectImage'); }
}