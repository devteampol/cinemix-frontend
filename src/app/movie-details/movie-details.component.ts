import { Component, OnInit } from '@angular/core';
import { Movie } from '../_models/movie';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../_services/movie.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.sass']
})
export class MovieDetailsComponent implements OnInit {

  id: number;
  movie: Movie;

  constructor(private route: ActivatedRoute, private router: Router, private movieService: MovieService) { }

  ngOnInit(): void {
    this.movie = new Movie();
    this.id = this.route.snapshot.params['id'];
    this.movieService.getMovie(this.id)
      .subscribe(data => {
        console.log(data); 
        this.movie = data;
      }, error => console.log(error));
  }

  list(){
    this.router.navigate(['movies']);
  }

}
