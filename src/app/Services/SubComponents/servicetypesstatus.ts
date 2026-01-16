import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Servicetypesinterface } from '../../Interfaces/servicetypesinterface';

@Injectable({
  providedIn: 'root'
})
export class ServiceTypesstatus {
   private deletedtables = new BehaviorSubject<Servicetypesinterface[]>([]);
     deletedtables$ = this.deletedtables.asObservable();
     setDeletedTables(res:Servicetypesinterface[]) {
       this.deletedtables.next(res);
     } 
}
