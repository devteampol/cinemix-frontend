import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from '../_services/token-storage.service';
import {Screening} from '../_models/screening';
import {ScreeningService} from '../_services/screening.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Reservation} from '../_models/reservation';
import {ReservationService} from '../_services/reservation.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.sass']
})
export class ReservationComponent implements OnInit {

  screening: Screening = new Screening();
  reservation: Reservation = new Reservation();
  submitted = false;
  isLoggedIn = false;
  id: number;
  username: string;

  constructor(private tokenStorage: TokenStorageService,
              private screeningService: ScreeningService,
              private reservationService: ReservationService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
    this.id = this.route.snapshot.params['id'];
    this.screeningService.getScreening(this.id).subscribe(data => {
      console.log(data);
      this.screening = data;
    }, error => console.log(error));
  }

  buildReservation() {
    if (this.isLoggedIn) {
      const user = this.tokenStorage.getUser();
      this.username = user.username;
      this.reservation.screening = this.screening.id;
      this.reservation.username = this.username;
    }
  }

  save() {
    this.buildReservation();
    this.reservationService.createReservation(this.reservation).subscribe(data => console.log(data), error => console.log(error));
    this.reservation = new Reservation();
    setTimeout(() => {
      console.log(this.gotoList());
    }, 750);
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }

  gotoList() {
    this.router.navigate(['repertoire']);
  }

}
