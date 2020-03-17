import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Announcement, AnnouncementMinMaxValues, Category} from 'src/app/apps/announcement/_store/_models/announcement.model';
import {Store} from '@ngrx/store';
import * as fromAnnouncement from 'src/app/apps/announcement/_store/_reducers/announcement.reducer';
import {MatPaginator} from '@angular/material/paginator';
import {takeUntil} from 'rxjs/operators';
import * as AnnouncementActions from 'src/app/apps/announcement/_store/_actions/announcement.actions';
import {
    selectAnnouncementError,
    selectAnnouncementLoading,
    selectAnnouncements,
    selectAnnouncementsCount
} from 'src/app/apps/announcement/_store/_selectors/announcement.selectors';
import {ErrorResponse} from 'src/app/common/const';
import {AnnouncementService} from 'src/app/apps/announcement/_store/_services/announcement.service';
import {loadCategories} from 'src/app/apps/announcement/_store/_actions/category.actions';
import {selectCategories} from 'src/app/apps/announcement/_store/_selectors/category.selectors';
import {loadAnnouncementMinMaxValues} from 'src/app/apps/announcement/_store/_actions/announcement-min-max-values.actions';
import {selectAnnouncementMinMaxValues} from 'src/app/apps/announcement/_store/_selectors/announcement-min-max-values.selectors';


@Component({
    selector: 'app-announcement-list',
    templateUrl: './announcement-list.component.html',
    styleUrls: ['./announcement-list.component.css']
})
export class AnnouncementListComponent implements OnInit, OnDestroy, AfterViewInit {

    @ViewChild('paginator') paginator: MatPaginator;
    @ViewChild('readMore') readMore;
    @ViewChild('readMoreContent') readMoreContent;
    announcements$: Observable<Announcement[]> = this.store.select(selectAnnouncements);
    announcementCount$: Observable<number> = this.store.select(selectAnnouncementsCount);
    loading$: Observable<boolean> = this.store.select(selectAnnouncementLoading);
    categories$: Observable<Category[]> = this.store.select(selectCategories);
    announcementMinMaxValues$: Observable<AnnouncementMinMaxValues> = this.store.select(selectAnnouncementMinMaxValues);
    error$: Observable<ErrorResponse> = this.store.select(selectAnnouncementError);
    uns$ = new Subject();

    filterForm = this.service.getFilterForm();
    isOpen = false;

    readMorePage;

    constructor(
        private store: Store<fromAnnouncement.State>,
        private service: AnnouncementService
    ) {}

    ngOnInit() {
        this.getAnnouncementsMinMaxValues();
        this.getAnnouncements();
        this.store.dispatch(loadCategories());

        // this.filterForm.get('date_created_min').valueChanges.pipe(
        //
        // );
    }

    ngOnDestroy() {
        this.uns$.next();
        this.uns$.complete();
    }

    ngAfterViewInit() {
        this.setPaginator();
        this.watchPageChange();
        this.readMorePage = document.querySelector('.read-more');
        this.readMoreContent = document.querySelector('.read-more-content');
        this.readMore = document.querySelectorAll('.read-more-button');
    }

    public getAnnouncements() {
        this.store.dispatch(AnnouncementActions.loadAnnouncements());
    }

    public getAnnouncementsMinMaxValues() {
        this.store.dispatch(loadAnnouncementMinMaxValues());
    }

    public resetForm() {
        this.filterForm = this.service.resetFilterForm();
        this.getAnnouncements();
    }

    public openDetails(id: number) {
        this.getAnnouncement(id);

        this.readMorePage.style.opacity = '1';
        this.readMorePage.style.pointerEvents = 'auto';
        this.readMoreContent.style.transform = 'translateX(0)';

        document.querySelector('.close-read-more').addEventListener('click', () => {
            this.readMorePage.style.opacity = '0';
            this.readMorePage.style.pointerEvents = 'none';
            this.readMoreContent.style.transform = 'translateX(100%)';
        });
    }

    private getAnnouncement(id: number) {
        this.store.dispatch(AnnouncementActions.loadAnnouncement({id}));
    }

    private setPaginator() {
        this.service.setPaginator(this.paginator);
    }

    private watchPageChange() {
        this.paginator.page.pipe(takeUntil(this.uns$)).subscribe(() => this.getAnnouncements());
    }

}
