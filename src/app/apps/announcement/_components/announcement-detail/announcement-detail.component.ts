import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';


@Component({
  selector: 'app-announcement-detail',
  templateUrl: './announcement-detail.component.html',
  styleUrls: ['./announcement-detail.component.css']
})
export class AnnouncementDetailComponent implements OnInit {

  constructor(private store: Store<any>) { }

  ngOnInit(): void {
  }

}
