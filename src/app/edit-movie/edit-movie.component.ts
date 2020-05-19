import {Component, OnInit} from '@angular/core';
import {Movie} from '../_models/movie';
import {ActivatedRoute, Router} from '@angular/router';
import {MovieService} from '../_services/movie.service';
import {TokenStorageService} from '../_services/token-storage.service';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.sass']
})
export class EditMovieComponent implements OnInit {

  id: number;
  movie: Movie;
  submitted = false;
  isLoggedIn = false;

  constructor(private tokenStorage: TokenStorageService,
              private route: ActivatedRoute,
              private router: Router,
              private movieService: MovieService) {
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
    this.movie = new Movie();
    this.id = this.route.snapshot.params['id'];
    this.movieService.getMovie(this.id)
      .subscribe(data => {
        console.log(data);
        this.movie = data;
      }, error => console.log(error));
  }

  update() {
    this.movieService.updateMovie(this.movie).subscribe(data => console.log(data), error => console.log(error));
    this.list();
  }

  onSubmit() {
    this.submitted = true;
    this.update();
  }

  list() {
    this.router.navigate(['movies']);
  }
}
