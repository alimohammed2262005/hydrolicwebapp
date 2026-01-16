import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Projectinterface } from '../../Interfaces/projectinterface';

@Injectable({
  providedIn: 'root'
})
export class Projectstatus {
   private deletedprojects = new BehaviorSubject<Projectinterface[]>([]);
     deletedprojects$ = this.deletedprojects.asObservable();
     setDeletedProjects(res: Projectinterface[]) {
       this.deletedprojects.next(res);
     } 
}
