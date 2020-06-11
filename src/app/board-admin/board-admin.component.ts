import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TokenStorageService} from '../_services/token-storage.service';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.sass']
})
export class BoardAdminComponent implements OnInit {

  submitted = false;
  isLoggedIn = false;

  constructor(private tokenStorage: TokenStorageService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
  }

  movieRouter() {
    this.router.navigate(['movies/add']);
  }

  seanseRouter() {
    this.router.navigate(['repertoire/add']);
  }

  hallRouter() {
    this.router.navigate(['halls/add']);
  }
}
