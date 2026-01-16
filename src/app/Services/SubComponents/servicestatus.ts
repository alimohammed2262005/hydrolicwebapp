import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Serviceinterface } from '../../Interfaces/serviceinterface';
@Injectable({
  providedIn: 'root'
})
export class Servicestatus {
 private deletedServices = new BehaviorSubject<Serviceinterface[]>([]);
   deletedServices$ = this.deletedServices.asObservable();
   setDeletedServices(res: Serviceinterface[]) {
     this.deletedServices.next(res);
   } 
}