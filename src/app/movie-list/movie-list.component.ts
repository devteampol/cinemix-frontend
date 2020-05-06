import { Component, OnInit } from '@angular/core';
import { Movie } from '../_models/movie';
import { Observable } from 'rxjs';
import { MovieService } from '../_services/movie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.sass']
})
export class MovieListComponent implements OnInit {
  movies: Observable<Movie[]>;

  constructor(private movieService: MovieService, private router: Router) { }

  ngOnInit(): void {
    this.reloadData();
  }

  reloadData() {
    this.movies = this.movieService.getMovieList();
  }

  movieDetails(id: number){
    this.router.navigate(['movies/details/', id]);
  }

  movieEdit(id: number){
    this.router.navigate(['movies/edit/', id]);
  }

}
