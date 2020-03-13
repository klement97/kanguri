import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';

import * as AnnouncementActions from 'src/app/apps/announcement/_store/_actions/announcement.actions';
import {AnnouncementService} from 'src/app/apps/announcement/_store/_services/announcement.service';


@Injectable()
export class AnnouncementEffects {
    loadAnnouncements$ = createEffect(() => this.actions$.pipe(
        ofType(AnnouncementActions.loadAnnouncements),
        switchMap(() => this.announcementService.getAnnouncements().pipe(
            map(({data, count}) => {
                return AnnouncementActions.loadAnnouncementsSuccess({announcements: data, count});
            }),
            catchError(error => {
                return of(AnnouncementActions.loadAnnouncementsFailure({error}));
            }))
        ))
    );

    loadAnnouncement$ = createEffect(() => this.actions$.pipe(
        ofType(AnnouncementActions.loadAnnouncement),
        switchMap(({id}) => this.announcementService.getAnnouncement(id).pipe(
            map(({data}) => AnnouncementActions.loadAnnouncementSuccess({announcement: data})),
            catchError((error) => of(AnnouncementActions.loadAnnouncementFailure({error: error.error})))
        ))
    ));

    constructor(
        private actions$: Actions,
        private announcementService: AnnouncementService
    ) {}

}
