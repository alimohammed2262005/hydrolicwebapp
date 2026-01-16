import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../Environment/environment';
import { AddOrUpdateService, Serviceinterface } from '../Interfaces/serviceinterface';
@Injectable({
  providedIn: 'root',
})
export class ServiceServices {
  constructor(private http: HttpClient) {}
    getallservices() {
      return this.http.get<Serviceinterface[]>(Environment.BaseURL + 'OurServices');
    }
  addservice(service: FormData) {
      return this.http.post<string>(Environment.BaseURL + 'OurServices', service, { responseType: 'text' as 'json' });
  }
    updateservicebyid(id: number, service: FormData) {
      return this.http.patch<string>(Environment.BaseURL + 'OurServices/' + id, service, { responseType: 'text' as 'json' });
  }
    deleteservicebyid(id: number) {
      return this.http.put<string>(Environment.BaseURL + 'OurServices/SoftDelete?id=' + id, id, { responseType: 'text' as 'json' });
    }
    restoreservicebyid(id: number) {
      return this.http.put<string>(Environment.BaseURL + 'OurServices/Restore?id=' + id, id, { responseType: 'text' as 'json' });
    }
    getalldeletedservices() {
      return this.http.get<Serviceinterface[]>(Environment.BaseURL + 'OurServices/getalldeletedservices');
    }
}