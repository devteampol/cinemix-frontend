import {Component, OnInit} from '@angular/core';
import {Screening} from '../_models/screening';
import {TokenStorageService} from '../_services/token-storage.service';
import {ScreeningService} from '../_services/screening.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Movie} from '../_models/movie';
import {MovieService} from '../_services/movie.service';
import {ScreeningTranslated} from '../_models/screeningTranslated';

@Component({
  selector: 'app-edit-screening',
  templateUrl: './edit-screening.component.html',
  styleUrls: ['./edit-screening.component.sass']
})
export class EditScreeningComponent implements OnInit {

  id: number;
  screening: Screening;
  screeningTranslated: ScreeningTranslated;
  movies: Observable<Movie[]>;
  submitted = false;
  isLoggedIn = false;

  constructor(private tokenStorage: TokenStorageService,
              private route: ActivatedRoute,
              private router: Router,
              private movieService: MovieService,
              private screeningService: ScreeningService) {
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
    this.reloadData();
    this.screening = new Screening();
    this.id = this.route.snapshot.params['id'];
    this.screeningService.getScreening(this.id)
      .subscribe(data => {
        console.log(data);
        this.screening = data;
      }, error => console.log(error));
  }

  translateScreening() {
    this.screeningTranslated = new ScreeningTranslated();
    this.screeningTranslated.id = this.screening.id;
    this.screeningTranslated.movie = this.screening.movie.id;
    this.screeningTranslated.room = this.screening.room;
    this.screeningTranslated.date = this.screening.date;
  }

  compareFn(m1: Movie, m2: Movie): boolean {
    return m1 && m2 ? m1.id === m2.id : m1 === m2;
  }

  reloadData() {
    this.movies = this.movieService.getMovieList();
  }

  update() {
    this.translateScreening();
    this.screeningService.updateScreening(this.screeningTranslated).subscribe(data => console.log(data), error => console.log(error));
    setTimeout(() => {
      console.log(this.gotoList());
    }, 200);
  }

  onSubmit() {
    this.submitted = true;
    this.update();
  }

  gotoList() {
    this.router.navigate(['repertoire']);
  }

}
