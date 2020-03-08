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
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


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

    filterForm = this.getInitialFilterForm();

    uns$ = new Subject();

    constructor(
        private store: Store<fromAnnouncement.State>,
        private fb: FormBuilder
    ) {}

    ngOnInit() {
        this.getAnnouncements(1, 10);
    }

    ngOnDestroy() {
        this.uns$.next();
        this.uns$.complete();
    }

    ngAfterViewInit() {
        this.changePage();
    }

    private getAnnouncements(page: number, pageSize: number) {
        this.store.dispatch(AnnouncementActions.loadAnnouncements({page, pageSize}));
    }

    private changePage() {
        this.paginator.page.pipe(takeUntil(this.uns$))
        .subscribe((page) => this.getAnnouncements(page.pageIndex + 1, page.pageSize));
    }

    private getInitialFilterForm(): FormGroup {
        return this.fb.group({
            name: ['', [Validators.maxLength(255)]],
            price_min: 0,
            price_max: 1000,
            category: null,
            date_created_min: '',
            date_created_max: ''
        });
    }

}
