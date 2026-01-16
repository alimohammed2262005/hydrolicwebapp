import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProjectImagesInterface } from '../../../Interfaces/project-images-interface';
import { ProjectImagesService } from '../../../Services/project-images-service';
import { ProjectServices } from '../../../Services/project-services';
import { Projectinterface } from '../../../Interfaces/projectinterface';
@Component({
  selector: 'app-addprojectimage',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './addprojectimage.html',
  styleUrls: ['./addprojectimage.css'],
})
export class AddProjectImage implements OnInit {
  projectImageForm!: FormGroup;
  selectedFile: File | null = null;
  message: string = '';
  messageType: 'success' | 'error' | '' = '';

  projectsList: Projectinterface[] = [];

  constructor(
    private projectImageService: ProjectImagesService,
    private projectsservice: ProjectServices,
    private router: Router
  ) {
    this.projectImageForm = new FormGroup({
      projectId: new FormControl('', Validators.required),
      image: new FormControl(null, Validators.required)
    });
  }

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects() {
    this.projectsservice.getallprojects().subscribe({
      next: (res) => {
        this.projectsList = res;
      },
      error: (err) => console.error('Error loading projects:', err)
    });
  }

  onFileSelect(event: any) {
    this.selectedFile = event.target.files.length > 0 ? event.target.files[0] : null;
    this.projectImageForm.get('image')!.setValue(this.selectedFile);
  }

  submit() {
    if (this.projectImageForm.invalid) {
      this.projectImageForm.markAllAsTouched();
      return;
    }

    if (!this.selectedFile) {
      this.showMessage('يرجى اختيار صورة للمشروع', 'error');
      return;
    }

    const formData = new FormData();
    formData.append('ProjectId', this.projectImageForm.value.projectId);
    formData.append('Image', this.selectedFile, this.selectedFile.name);

    this.projectImageService.addProjectImage(formData).subscribe({
      next: res => {
        this.showMessage(res, 'success');
        setTimeout(() => this.router.navigate(['adminprojectimages']), 1000);
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

  get projectId() { return this.projectImageForm.get('projectId'); }
  get image() { return this.projectImageForm.get('image'); }
}
