import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

const API_URL = environment.apiUrl;
const API_SCREENING_URL = 'api/screenings/';

@Injectable({
  providedIn: 'root'
})
export class ScreeningService {

  constructor(private http: HttpClient) {
  }

  getScreening(id: number): Observable<any> {
    return this.http.get(`${API_URL + API_SCREENING_URL}${id}`);
  }

  createScreening(screening: Object): Observable<Object> {
    return this.http.post(`${API_URL + API_SCREENING_URL + 'add'}`, screening);
  }

  updateScreening(screening: Object): Observable<Object> {
    return this.http.put(`${API_URL + API_SCREENING_URL + 'edit'}`, screening);
  }

  deleteScreening(id: number): Observable<any> {
    return this.http.delete(`${API_URL + API_SCREENING_URL + 'delete'}/${id}`);
  }

  getScreeningList(): Observable<any> {
    return this.http.get(`${API_URL + API_SCREENING_URL + 'all'}`);
  }

  reserveTickets(screeningId: number, ticketsAmount: number): Observable<any> {
    return this.http.put(`${API_URL + API_SCREENING_URL + 'reservation'}/${screeningId}/${ticketsAmount}`, null);
  }
}
