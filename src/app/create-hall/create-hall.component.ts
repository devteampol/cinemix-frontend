import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from '../_services/token-storage.service';
import {Router} from '@angular/router';
import {Hall} from '../_models/hall';
import {HallService} from '../_services/hall.service';

@Component({
  selector: 'app-create-hall',
  templateUrl: './create-hall.component.html',
  styleUrls: ['./create-hall.component.sass']
})
export class CreateHallComponent implements OnInit {

  hall: Hall = new Hall();
  submitted = false;
  isLoggedIn = false;

  constructor(private tokenStorage: TokenStorageService, private hallService: HallService, private router: Router) {
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
  }

  save() {
    this.hallService.createHall(this.hall).subscribe(data => console.log(data), error => console.log(error));
    this.hall = new Hall();
    setTimeout(() => {
      console.log(this.gotoList());
    }, 750);
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }

  gotoList() {
    this.router.navigate(['halls']);
  }

}
