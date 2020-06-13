import {Movie} from './movie';
import {Hall} from './hall';

export class Screening {
  id: number;
  date: string;
  movie: Movie;
  hall: Hall;
  tickets: number;
}
