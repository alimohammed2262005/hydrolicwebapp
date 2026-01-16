import { Component } from '@angular/core';
import { ProjectServices } from '../../../Services/project-services';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-updateproject',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './updateproject.html',
  styleUrls: ['./updateproject.css'],
})
export class Updateproject {
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
      projectName: new FormControl(''),
      projectDescription: new FormControl(''),
      projectType: new FormControl(''),
      projectImage: new FormControl(null)
    });
  }

  onFileSelect(event: any) {
    this.selectedFile = event.target.files.length > 0 ? event.target.files[0] : null;
    this.projectForm.get('projectImage')!.setValue(this.selectedFile);
  }

  submit() {
    if (!this.projectId) return;

    const formData = new FormData();

    if (this.projectForm.value.projectName) formData.append('Name', this.projectForm.value.projectName);
    if (this.projectForm.value.projectDescription) formData.append('Description', this.projectForm.value.projectDescription);
    if (this.projectForm.value.projectType) formData.append('Type', this.projectForm.value.projectType);
    if (this.selectedFile) formData.append('Image', this.selectedFile, this.selectedFile.name);

    if (formData.keys().next().done) {
      this.showMessage('لم يتم تعديل أي حقل', 'error');
      return;
    }

this.projectService.updateprojectbyid(this.projectId, formData).subscribe({
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
