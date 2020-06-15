import {Component, OnInit} from '@angular/core';
import {Screening} from '../_models/screening';
import {TokenStorageService} from '../_services/token-storage.service';
import {ScreeningService} from '../_services/screening.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Movie} from '../_models/movie';
import {MovieService} from '../_services/movie.service';
import {Hall} from '../_models/hall';
import {HallService} from '../_services/hall.service';
import {ScreeningTranslated} from '../_models/screeningTranslated';

@Component({
  selector: 'app-edit-screening',
  templateUrl: './edit-screening.component.html',
  styleUrls: ['./edit-screening.component.sass']
})
export class EditScreeningComponent implements OnInit {

  id: number;
  screening: Screening = new Screening();
  screeningTranslated: ScreeningTranslated = new ScreeningTranslated();
  movies: Observable<Movie[]>;
  halls: Observable<Hall[]>;
  hall: Hall = new Hall();
  submitted = false;
  isLoggedIn = false;
  isHallAvailable = true;

  constructor(private tokenStorage: TokenStorageService,
              private route: ActivatedRoute,
              private router: Router,
              private movieService: MovieService,
              private hallService: HallService,
              private screeningService: ScreeningService) {
  }

  ngOnInit(): void {
    this.reloadData();
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
    this.id = this.route.snapshot.params['id'];
    this.screeningService.getScreening(this.id)
      .subscribe(data => {
        console.log(data);
        this.screening = data;
      }, error => console.log(error));
    setTimeout(() => {
      this.isHallAvailable = this.checkHallAvailability();
    }, 250);
  }

  compareMovie(m1: Movie, m2: Movie): boolean {
    return m1 && m2 ? m1.id === m2.id : m1 === m2;
  }

  compareHall(h1: Hall, h2: Hall): boolean {
    return h1 && h2 ? h1.id === h2.id : h1 === h2;
  }

  translateScreening() {
    this.screeningTranslated = new ScreeningTranslated();
    this.screeningTranslated.id = this.screening.id;
    this.screeningTranslated.movie = this.screening.movie.id;
    this.screeningTranslated.hall = this.screening.hall.id;
    this.screeningTranslated.date = this.screening.date;
    this.screeningTranslated.tickets = this.screening.tickets;
  }

  reloadData() {
    this.movies = this.movieService.getMovieList();
    this.halls = this.hallService.getHallList();
  }

  update() {
    this.translateScreening();
    this.screeningService.updateScreening(this.screeningTranslated).subscribe(data => console.log(data), error => console.log(error));
    setTimeout(() => {
      console.log(this.gotoList());
    }, 200);
  }

  checkHallAvailability(): boolean {
    if (this.screening.hall.active === false) {
      this.isHallAvailable = false;
      return false;
    } else {
      this.isHallAvailable = true;
      return true;
    }
  }

  onSubmit() {
    if (this.checkHallAvailability()) {
      this.submitted = true;
      this.update();
    } else {
      console.log('selected hall is not available');
    }
  }

  gotoList() {
    this.router.navigate(['repertoire']);
  }

}
