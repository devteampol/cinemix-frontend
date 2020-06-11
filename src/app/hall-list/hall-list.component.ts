import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TokenStorageService} from '../_services/token-storage.service';
import {Observable} from 'rxjs';
import {Hall} from '../_models/hall';
import {HallService} from '../_services/hall.service';

@Component({
  selector: 'app-hall-list',
  templateUrl: './hall-list.component.html',
  styleUrls: ['./hall-list.component.sass']
})
export class HallListComponent implements OnInit {

  halls: Observable<Hall[]>;
  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username: string;

  constructor(private hallService: HallService, private router: Router, private tokenStorageService: TokenStorageService) {
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
    this.halls = this.hallService.getHallList();
  }

  hallEdit(id: number) {
    this.router.navigate(['halls/edit/', id]);
  }

  hallDelete(hall: Hall) {
    this.hallService.deleteHall(hall.id).subscribe(data => console.log(data), error => console.log(error));
    setTimeout(() => {
      console.log(this.reloadData());
    }, 200);
  }
}
