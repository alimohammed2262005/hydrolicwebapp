import { Injectable } from '@angular/core';
import { Environment } from '../Environment/environment';
import { HttpClient } from '@angular/common/http';
import { ProjectImagesInterface } from '../Interfaces/project-images-interface';

@Injectable({
  providedIn: 'root',
})
export class ProjectImagesService {
  constructor(private http: HttpClient) {}

  getAllProjectImages() {
    return this.http.get<ProjectImagesInterface[]>(Environment.BaseURL + 'ProjectsImages');
  }

  getProjectImagesByProjectId(id: number) {
    return this.http.get<ProjectImagesInterface[]>(Environment.BaseURL + 'ProjectsImages/GetById?id='+ id);
  }

  addProjectImage(image: FormData) {
    return this.http.post<string>(
      Environment.BaseURL + 'ProjectsImages',
      image,
      { responseType: 'text' as 'json' }
    );
  }

  updateProjectImageById(id: number, image: FormData) {
    return this.http.patch<string>(
      Environment.BaseURL + 'ProjectsImages/' + id,
      image,
      { responseType: 'text' as 'json' }
    );
  }

  softDeleteProjectImageById(id: number) {
    return this.http.put<string>(
      Environment.BaseURL + 'ProjectsImages/SoftDelete?id=' + id,
      id,
      { responseType: 'text' as 'json' }
    );
  }

  restoreProjectImageById(id: number) {
    return this.http.put<string>(
      Environment.BaseURL + 'ProjectsImages/Restore?id=' + id,
      id,
      { responseType: 'text' as 'json' }
    );
  }

  getAllDeletedProjectImages() {
    return this.http.get<ProjectImagesInterface[]>(Environment.BaseURL + 'ProjectsImages/GetAllDeleted');
  }
}
