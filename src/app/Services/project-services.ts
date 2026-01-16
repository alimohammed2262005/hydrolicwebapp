import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../Environment/environment';
import { Projectinterface } from '../Interfaces/projectinterface';

@Injectable({
  providedIn: 'root'
})
export class ProjectServices {
  constructor(private http: HttpClient) {}

  getallprojects() {
    return this.http.get<Projectinterface[]>(Environment.BaseURL + 'Projects');
  }

  addproject(addproject: FormData) {
    return this.http.post<string>(Environment.BaseURL + 'Projects', addproject, { responseType: 'text' as 'json' });
  }

  updateprojectbyid(id: number, data: FormData) {
    return this.http.patch<string>(Environment.BaseURL + 'Projects/' + id, data, { responseType: 'text' as 'json' });
  }

  deleteprojectbyid(id: number) {
    return this.http.put<string>(Environment.BaseURL + 'Projects/SoftDelete?id=' + id, id, { responseType: 'text' as 'json' });
  }

  restoreprojectbyid(id: number) {
    return this.http.put<string>(Environment.BaseURL + 'Projects/Restore?id=' + id, id, { responseType: 'text' as 'json' });
  }

  getalldeletedprojects() {
    return this.http.get<Projectinterface[]>(Environment.BaseURL + 'Projects/getalldeletedprojects');
  }
}
