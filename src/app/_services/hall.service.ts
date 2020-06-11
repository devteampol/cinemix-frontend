import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

const API_URL = environment.apiUrl;
const API_HALL_URL = 'api/halls/';

@Injectable({
  providedIn: 'root'
})
export class HallService {

  constructor(private http: HttpClient) {
  }

  getHall(id: number): Observable<any> {
    return this.http.get(`${API_URL + API_HALL_URL}${id}`);
  }

  createHall(hall: Object): Observable<Object> {
    return this.http.post(`${API_URL + API_HALL_URL + 'add'}`, hall);
  }

  updateHall(hall: Object): Observable<Object> {
    return this.http.put(`${API_URL + API_HALL_URL + 'edit'}`, hall);
  }

  deleteHall(id: number): Observable<any> {
    return this.http.delete(`${API_URL + API_HALL_URL + 'delete/'}${id}`);
  }

  getHallList(): Observable<any> {
    return this.http.get(`${API_URL + API_HALL_URL + 'all'}`);
  }
}
