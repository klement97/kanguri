import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Announcement} from 'src/app/apps/announcement/_store/announcement.model';
import {Store} from '@ngrx/store';
import * as fromAnnouncement from '../../_store/announcement.reducer';
import {MatPaginator} from '@angular/material/paginator';
import {takeUntil} from 'rxjs/operators';
import * as AnnouncementActions from 'src/app/apps/announcement/_store/announcement.actions';
import {
    selectAnnouncementError,
    selectAnnouncementLoading,
    selectAnnouncements,
    selectAnnouncementsCount
} from 'src/app/apps/announcement/_store/announcement.selectors';
import {ErrorResponse} from 'src/app/common/const';
import {AnnouncementService} from 'src/app/apps/announcement/_store/announcement.service';


@Component({
    selector: 'app-announcement-list',
    templateUrl: './announcement-list.component.html',
    styleUrls: ['./announcement-list.component.css']
})
export class AnnouncementListComponent implements OnInit, OnDestroy, AfterViewInit {

    @ViewChild('paginator') paginator: MatPaginator;
    announcements$: Observable<Announcement[]> = this.store.select(selectAnnouncements);
    announcementCount$: Observable<number> = this.store.select(selectAnnouncementsCount);
    loading$: Observable<boolean> = this.store.select(selectAnnouncementLoading);
    error$: Observable<ErrorResponse> = this.store.select(selectAnnouncementError);

    filterForm = this.service.getFilterForm();

    uns$ = new Subject();

    constructor(
        private store: Store<fromAnnouncement.State>,
        private service: AnnouncementService
    ) {}

    ngOnInit() {
        this.getAnnouncements();
    }

    ngOnDestroy() {
        this.uns$.next();
        this.uns$.complete();
    }

    ngAfterViewInit() {
        this.setPaginator();
        this.watchPageChange();
    }

    public getAnnouncements() {
        this.store.dispatch(AnnouncementActions.loadAnnouncements());
    }

    public resetForm() {
        this.filterForm = this.service.getFilterForm();
    }

    private setPaginator() {
        this.service.setPaginator(this.paginator);
    }

    private watchPageChange() {
        this.paginator.page.pipe(takeUntil(this.uns$)).subscribe(() => this.getAnnouncements());
    }

}
