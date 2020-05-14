import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TokenStorageService} from '../_services/token-storage.service';
import {Movie} from '../_models/movie';
import {MovieService} from '../_services/movie.service';
import {Screening, ScreeningDto} from '../_models/screening';
import {ScreeningService} from '../_services/screening.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-create-screening',
  templateUrl: './create-screening.component.html',
  styleUrls: ['./create-screening.component.sass']
})
export class CreateScreeningComponent implements OnInit {

  screening: Screening = new Screening();
  screeningDto: ScreeningDto = new ScreeningDto();
  movies: Observable<Movie[]>;
  submitted = false;
  isLoggedIn = false;

  constructor(private tokenStorage: TokenStorageService,
              private movieService: MovieService,
              private seanseService: ScreeningService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.reloadData();
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
  }

  reloadData() {
    this.movies = this.movieService.getMovieList();
  }

  save() {
    this.screeningDto.movie = this.screening.movie.id;
    this.screeningDto.date = this.screening.date;
    this.screeningDto.room = this.screening.room;
    this.seanseService.createScreening(this.screeningDto).subscribe(data => console.log(data), error => console.log(error));
    this.screening = new Screening();
    this.screeningDto = new ScreeningDto();
    this.gotoList();
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }

  gotoList() {
    this.router.navigate(['repertoire']);
  }
}
