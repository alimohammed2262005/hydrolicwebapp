import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProjectImagesInterface } from '../../Interfaces/project-images-interface';
@Injectable({
  providedIn: 'root',
})
export class ProjectImagesStatus {
     private deletedprojectImages = new BehaviorSubject<ProjectImagesInterface[]>([]);
       deletedprojectImages$ = this.deletedprojectImages.asObservable();
       setDeletedProjectsImages(res: ProjectImagesInterface[]) {
         this.deletedprojectImages.next(res);
       } 
}