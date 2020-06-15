import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Reservation} from '../_models/reservation';

const API_URL = environment.apiUrl;
const API_RESERVATION_URL = 'api/reservations/';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http: HttpClient) {
  }

  getReservation(id: number): Observable<any> {
    return this.http.get(`${API_URL + API_RESERVATION_URL}${id}`);
  }

  getUserReservations(username: string): Observable<any> {
    return this.http.get(`${API_URL + API_RESERVATION_URL + 'username'}/${username}`);
  }

  createReservation(reservation: Reservation): Observable<Object> {
    return this.http.post(`${API_URL + API_RESERVATION_URL + 'reservation'}`, reservation);
  }

  cancelReservation(id: number): Observable<any> {
    return this.http.put(`${API_URL + API_RESERVATION_URL + 'cancelreservation'}/${id}`, null);
  }

  getReservationList(): Observable<any> {
    return this.http.get(`${API_URL + API_RESERVATION_URL + 'all'}`);
  }
}
