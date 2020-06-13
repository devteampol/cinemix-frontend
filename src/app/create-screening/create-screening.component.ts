import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TokenStorageService} from '../_services/token-storage.service';
import {Movie} from '../_models/movie';
import {MovieService} from '../_services/movie.service';
import {ScreeningService} from '../_services/screening.service';
import {Observable} from 'rxjs';
import {Hall} from '../_models/hall';
import {HallService} from '../_services/hall.service';
import {ScreeningTranslated} from '../_models/screeningTranslated';
import {Screening} from '../_models/screening';

@Component({
  selector: 'app-create-screening',
  templateUrl: './create-screening.component.html',
  styleUrls: ['./create-screening.component.sass']
})
export class CreateScreeningComponent implements OnInit {

  screening: Screening = new Screening();
  screeningTranslated: ScreeningTranslated = new ScreeningTranslated();
  movies: Observable<Movie[]>;
  halls: Observable<Hall[]>;
  submitted = false;
  isLoggedIn = false;
  isHallAvailable = true;

  constructor(private tokenStorage: TokenStorageService,
              private movieService: MovieService,
              private hallService: HallService,
              private seanseService: ScreeningService,
              private router: Router) {
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
    this.reloadData();
  }

  reloadData() {
    this.movies = this.movieService.getMovieList();
    this.halls = this.hallService.getHallList();
  }

  save() {
    this.screening.tickets = 10;
    this.translateScreening();
    this.seanseService.createScreening(this.screeningTranslated).subscribe(data => console.log(data), error => console.log(error));
    setTimeout(() => {
      console.log(this.gotoList());
    }, 750);
  }

  onSubmit() {
    if (this.isHallAvailable) {
      this.submitted = true;
      this.save();
    } else {
      console.log('selected hall is not available');
    }
  }

  translateScreening() {
    this.screeningTranslated.movie = this.screening.movie.id;
    this.screeningTranslated.hall = this.screening.hall.id;
    this.screeningTranslated.date = this.screening.date;
    this.screeningTranslated.tickets = this.screening.tickets;
  }

  checkHallAvailability() {
    if (this.screening.hall.active === false) {
      this.isHallAvailable = false;
    } else {
      this.isHallAvailable = true;
    }
  }

  gotoList() {
    this.router.navigate(['repertoire']);
  }
}
