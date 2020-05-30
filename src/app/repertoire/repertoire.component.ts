import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {Screening} from '../_models/screening';
import {ScreeningService} from '../_services/screening.service';
import {TokenStorageService} from '../_services/token-storage.service';

@Component({
  selector: 'app-repertoire',
  templateUrl: './repertoire.component.html',
  styleUrls: ['./repertoire.component.sass']
})
export class RepertoireComponent implements OnInit {
  screenings: Observable<Screening[]>;
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

  screeningDelete(screening: Screening) {
    this.screeningService.deleteScreening(screening.id).subscribe(data => console.log(data), error => console.log(error));
    setTimeout(() => {
      console.log(this.reloadData());
    }, 100);
  }

}
