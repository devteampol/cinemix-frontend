import {Component, OnInit} from '@angular/core';
import {UserService} from '../_services/user.service';
import {Reservation} from '../_models/reservation';
import {TokenStorageService} from '../_services/token-storage.service';
import {ReservationService} from '../_services/reservation.service';
import {Observable} from 'rxjs';
import {Screening} from '../_models/screening';
import {ScreeningService} from '../_services/screening.service';

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.sass']
})
export class BoardUserComponent implements OnInit {

  content = '';
  reservation: Reservation;
  reservations: Observable<Reservation[]>;
  screenings: Observable<Screening[]>;
  submitted = false;
  isLoggedIn = false;
  username: string;
  deleteMode = false;
  deleteId: number;

  constructor(private userService: UserService,
              private tokenStorage: TokenStorageService,
              private reservationService: ReservationService,
              private screeningService: ScreeningService) {
  }

  ngOnInit(): void {
    this.userService.getUserBoard().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
    this.reloadData();
  }

  reloadData() {
    if (this.isLoggedIn) {
      const user = this.tokenStorage.getUser();
      this.username = user.username;
      this.reservations = this.reservationService.getUserReservations(this.username);
      this.screenings = this.screeningService.getScreeningList();
      this.quitDeleting();
    }
  }

  cancelReservation(id: number) {
    this.reservationService.cancelReservation(id).subscribe(data => console.log(data), error => console.log(error));
    setTimeout(() => {
      console.log(this.reloadData());
    }, 200);
  }

  enterDeleteing(id: number) {
    this.deleteMode = true;
    this.deleteId = id;
  }

  quitDeleting() {
    this.deleteMode = false;
  }
}
