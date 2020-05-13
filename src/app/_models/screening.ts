import {Movie} from './movie';
import {MovieService} from '../_services/movie.service';

export class Screening {
  id: number;
  movie: number;
  date: string;
  room: number;
}
