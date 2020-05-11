import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = environment.apiUrl;
const API_SEANSE_URL = 'api/seanses/';

@Injectable({
  providedIn: 'root'
})
export class SeanseService {

  constructor(private http: HttpClient) { }

  getSeanse(id: number): Observable<any> {
    return this.http.get(`${API_URL + API_SEANSE_URL}${id}`);
  }

  createSeanse(seanse: Object): Observable<Object> {
    return this.http.post(`${API_URL + API_SEANSE_URL + 'add'}`, seanse);
  }

  updateSeanse(seanse: Object): Observable<Object> {
    return this.http.put(`${API_URL + API_SEANSE_URL + 'edit'}`, seanse);
  }

  getSeanseList(): Observable<any> {
    return this.http.get(`${API_URL + API_SEANSE_URL + 'all'}`);
  }
}
