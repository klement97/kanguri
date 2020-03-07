import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';

import * as AnnouncementActions from './announcement.actions';
import {AnnouncementService} from 'src/app/apps/announcement/_store/announcement.service';


@Injectable()
export class AnnouncementEffects {
    constructor(
        private actions$: Actions,
        private announcementService: AnnouncementService
    ) {}

    loadAnnouncements$ = createEffect(() => this.actions$.pipe(
        ofType(AnnouncementActions.loadAnnouncements),
        switchMap(payload => this.announcementService.getAnnouncements(payload).pipe(
            map(({data, pagination}) => {
                return AnnouncementActions.loadAnnouncementsSuccess({announcements: data, count: pagination.count});
            }),
            catchError(error => of(AnnouncementActions.loadAnnouncementsFailure({error}))))
        ))
    );

}
