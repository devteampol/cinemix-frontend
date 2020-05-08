import {Movie} from './movie';
import {Time} from '@angular/common';

export class Seanse {
  id: number;
  movie: Movie;
  time: Time;
  room: number;

  getId(): number {
    return this.id;
  }

  getMovie(): string {
    return this.movie.title;
  }

  getTime(): Time {
    return this.time;
  }

  getRoom(): number {
    return this.room;
  }
}
