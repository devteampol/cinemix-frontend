import {Component, OnInit} from '@angular/core';
import {Movie} from '../_models/movie';
import {Observable} from 'rxjs';
import {MovieService} from '../_services/movie.service';
import {Router} from '@angular/router';
import {TokenStorageService} from '../_services/token-storage.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.sass']
})
export class MovieListComponent implements OnInit {
  movies: Observable<Movie[]>;
  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username: string;

  constructor(private movieService: MovieService, private router: Router, private tokenStorageService: TokenStorageService) {
  }

  ngOnInit(): void {
    this.reloadData();
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      this.username = user.username;
    }
  }

  reloadData() {
    this.movies = this.movieService.getMovieList();
  }

  movieDetails(id: number) {
    this.router.navigate(['movies/details/', id]);
  }

  movieEdit(id: number) {
    this.router.navigate(['movies/edit/', id]);
  }

  movieDelete(movie: Movie) {
    this.movieService.deleteMovie(movie.id).subscribe(data => console.log(data), error => console.log(error));
    setTimeout(() => {
      console.log(this.reloadData());
    }, 100);
  }

}
