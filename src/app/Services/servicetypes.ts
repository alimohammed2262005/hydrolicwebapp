import { Injectable } from '@angular/core';
import { Servicetypesinterface } from '../Interfaces/servicetypesinterface';
import { Environment } from '../Environment/environment';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class Servicetypes {
    constructor(private http: HttpClient) {}

    getallservicetypes() {
    return this.http.get<Servicetypesinterface[]>(Environment.BaseURL + 'ServiceTypes');
  }
getservicetypesbyserviceid(id: number) {
    return this.http.get<string>(Environment.BaseURL + 'ServiceTypes/GetById?id=' + id);
}
addservicetype(service: FormData) {
    return this.http.post<string>(Environment.BaseURL + 'ServiceTypes', service, { responseType: 'text' as 'json' });
}
  updateservicetypebyid(id: number, service: FormData) {
    return this.http.patch<string>(Environment.BaseURL + 'ServiceTypes/' + id, service, { responseType: 'text' as 'json' });
}
  deleteservicetypebyid(id: number) {
    return this.http.put<string>(Environment.BaseURL + 'ServiceTypes/SoftDelete?id=' + id, id, { responseType: 'text' as 'json' });
  }

  restoreservicetypebyid(id: number) {
    return this.http.put<string>(Environment.BaseURL + 'ServiceTypes/Restore?id=' + id, id, { responseType: 'text' as 'json' });
  }

  getalldeletedservicetypes() {
    return this.http.get<Servicetypesinterface[]>(Environment.BaseURL + 'ServiceTypes/getalldeletedservicetypes');
  }
}