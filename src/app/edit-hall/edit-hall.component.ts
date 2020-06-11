import {Component, OnInit} from '@angular/core';
import {Hall} from '../_models/hall';
import {TokenStorageService} from '../_services/token-storage.service';
import {ActivatedRoute, Router} from '@angular/router';
import {HallService} from '../_services/hall.service';

@Component({
  selector: 'app-edit-hall',
  templateUrl: './edit-hall.component.html',
  styleUrls: ['./edit-hall.component.sass']
})
export class EditHallComponent implements OnInit {

  id: number;
  hall: Hall;
  submitted = false;
  isLoggedIn = false;

  constructor(private tokenStorage: TokenStorageService,
              private route: ActivatedRoute,
              private router: Router,
              private hallService: HallService) {
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
    this.hall = new Hall();
    this.id = this.route.snapshot.params['id'];
    this.hallService.getHall(this.id)
      .subscribe(data => {
        console.log(data);
        this.hall = data;
      }, error => console.log(error));
  }

  update() {
    this.hallService.updateHall(this.hall).subscribe(data => console.log(data), error => console.log(error));
    setTimeout(() => {
      console.log(this.list());
    }, 200);
  }

  onSubmit() {
    this.submitted = true;
    this.update();
  }

  list() {
    this.router.navigate(['halls']);
  }
}
