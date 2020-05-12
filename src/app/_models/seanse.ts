import {Movie} from './movie';

export class Seanse {
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
