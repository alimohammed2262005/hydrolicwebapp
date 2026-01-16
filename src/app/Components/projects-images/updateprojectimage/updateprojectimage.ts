import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectImagesService } from '../../../Services/project-images-service';
import { ProjectServices } from '../../../Services/project-services';
import { Projectinterface } from '../../../Interfaces/projectinterface';

@Component({
  selector: 'app-updateprojectimage',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './updateprojectimage.html',
  styleUrls: ['./updateprojectimage.css'],
})
export class UpdateProjectImage implements OnInit {
  projectImageForm!: FormGroup;
  selectedFile: File | null = null;
  message: string = '';
  messageType: 'success' | 'error' | '' = '';
  projectsList: Projectinterface[] = [];
  imageId!: number;

  constructor(
    private projectImageService: ProjectImagesService,
    private projectService: ProjectServices,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.projectImageForm = new FormGroup({
      projectId: new FormControl(''),
      image: new FormControl(null)
    });
  }

  ngOnInit(): void {
    this.imageId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadProjects();
    this.loadImageData();
  }

  loadProjects() {
    this.projectService.getallprojects().subscribe({
      next: (res) => { this.projectsList = res; },
      error: (err) => console.error(err)
    });
  }

  loadImageData() {
    this.projectImageService.getProjectImagesByProjectId(this.imageId).subscribe({
      next: (res) => {
        if (res && res.length > 0) {
          const img = res[0];
          this.projectImageForm.patchValue({
            projectId: img.projectId
          });
        }
      },
      error: (err) => console.error(err)
    });
  }

  onFileSelect(event: any) {
    this.selectedFile = event.target.files.length > 0 ? event.target.files[0] : null;
    this.projectImageForm.get('image')!.setValue(this.selectedFile);
  }

  submit() {
    const formData = new FormData();
    if (this.projectImageForm.value.projectId) {
      formData.append('ProjectId', this.projectImageForm.value.projectId);
    }
    if (this.selectedFile) {
      formData.append('Image', this.selectedFile, this.selectedFile.name);
    }

    this.projectImageService.updateProjectImageById(this.imageId, formData).subscribe({
      next: res => {
        this.showMessage(res, 'success');
        setTimeout(() => this.router.navigate(['/adminprojectimages']), 1000);
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
