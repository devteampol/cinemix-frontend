import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {Screening} from '../_models/screening';
import {ScreeningService} from '../_services/screening.service';
import {TokenStorageService} from '../_services/token-storage.service';
import {ScreeningMovieL} from '../_models/screeningMovieL';

@Component({
  selector: 'app-repertoire',
  templateUrl: './repertoire.component.html',
  styleUrls: ['./repertoire.component.sass']
})
export class RepertoireComponent implements OnInit {
  screenings: Observable<Screening[]>;
  screeningLongM: ScreeningMovieL;
  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username: string;

  constructor(private screeningService: ScreeningService, private router: Router, private tokenStorageService: TokenStorageService) {
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
    this.screenings = this.screeningService.getScreeningList();
  }

  screeningEdit(id: number) {
    this.router.navigate(['repertoire/edit/', id]);
  }

  translateScreening(screening: Screening) {
    this.screeningLongM = new ScreeningMovieL();
    this.screeningLongM.id = screening.id;
    this.screeningLongM.movie = screening.movie.id;
    this.screeningLongM.room = screening.room;
    this.screeningLongM.date = screening.date;
    this.screeningDelete(this.screeningLongM);
  }

  screeningDelete(screening: Object) {
    this.screeningService.deleteScreening(screening);
    this.reloadData();
  }

}
