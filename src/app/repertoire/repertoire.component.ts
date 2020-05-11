import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {Seanse} from '../_models/seanse';
import {SeanseService} from '../_services/seanse.service';

@Component({
  selector: 'app-repertoire',
  templateUrl: './repertoire.component.html',
  styleUrls: ['./repertoire.component.sass']
})
export class RepertoireComponent implements OnInit {
  seanses: Observable<Seanse[]>;

  constructor(private seanseService: SeanseService, private router: Router) {
  }

  ngOnInit(): void {
    this.reloadData();
  }

  reloadData() {
    this.seanses = this.seanseService.getSeanseList();
  }

  seanseEdit(id: number) {
    this.router.navigate(['seanses/edit/', id]);
  }
}
