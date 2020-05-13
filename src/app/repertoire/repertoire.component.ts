import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {Screening} from '../_models/screening';
import {ScreeningService} from '../_services/screening.service';

@Component({
  selector: 'app-repertoire',
  templateUrl: './repertoire.component.html',
  styleUrls: ['./repertoire.component.sass']
})
export class RepertoireComponent implements OnInit {
  screenings: Observable<Screening[]>;

  constructor(private screeningService: ScreeningService, private router: Router) {
  }

  ngOnInit(): void {
    this.reloadData();
  }

  reloadData() {
    this.screenings = this.screeningService.getScreeningList();
  }

  screeningEdit(id: number) {
    this.router.navigate(['repertoire/edit/', id]);
  }
}
