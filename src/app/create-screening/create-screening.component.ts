import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TokenStorageService} from '../_services/token-storage.service';
import {Movie} from '../_models/movie';
import {MovieService} from '../_services/movie.service';
import {Screening} from '../_models/screening';
import {ScreeningService} from '../_services/screening.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-create-screening',
  templateUrl: './create-screening.component.html',
  styleUrls: ['./create-screening.component.sass']
})
export class CreateScreeningComponent implements OnInit {

  screening: Screening = new Screening();
  movies: Observable<Movie[]>;
  submitted = false;
  isLoggedIn = false;

  constructor(private tokenStorage: TokenStorageService,
              private movieService: MovieService,
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
  }

  save() {
    this.seanseService.createScreening(this.screening).subscribe(data => console.log(data), error => console.log(error));
    this.screening = new Screening();
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
