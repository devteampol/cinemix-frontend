import {Movie} from './movie';
import {MovieService} from '../_services/movie.service';

export class Screening {
  id: number;
  movie: Movie;
  date: String;
  room: number;

  getId(): number {
    return this.id;
  }

  getMovie(): Movie {
    return this.movie;
  }

  getTime(): String {
    return this.date;
  }

  getRoom(): number {
    return this.room;
  }
}

export class ScreeningDto {
  movie: number;
  date: String;
  room: number;
}
