import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {Announcement} from 'src/app/apps/announcement/_store/_models/announcement.model';
import {selectAnnouncement} from 'src/app/apps/announcement/_store/_selectors/announcement.selectors';


@Component({
  selector: 'app-announcement-detail',
  templateUrl: './announcement-detail.component.html',
  styleUrls: ['./announcement-detail.component.css']
})
export class AnnouncementDetailComponent implements OnInit {
  announcement$: Observable<Announcement> = this.store.select(selectAnnouncement);

  constructor(private store: Store<any>) { }

  ngOnInit(): void {
  }

}
