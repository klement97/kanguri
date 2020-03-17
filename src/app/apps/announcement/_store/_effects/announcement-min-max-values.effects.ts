import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import * as AnnouncementMinMaxValuesActions from 'src/app/apps/announcement/_store/_actions/announcement-min-max-values.actions';
import {catchError, exhaustMap, map} from 'rxjs/operators';
import {AnnouncementService} from 'src/app/apps/announcement/_store/_services/announcement.service';
import {of} from 'rxjs';


@Injectable()
export class AnnouncementMinMaxValuesEffects {

    loadAnnouncementMinMaxValues$ = createEffect(() => this.actions$.pipe(
        ofType(AnnouncementMinMaxValuesActions.loadAnnouncementMinMaxValues),
        exhaustMap(() => this.announcementService.getAnnouncementMinMaxValues().pipe(
            map((response) => {
                return AnnouncementMinMaxValuesActions.loadAnnouncementMinMaxValuesSuccess({data: response.data});
            }),
            catchError((err) => {
                return of(AnnouncementMinMaxValuesActions.loadAnnouncementMinMaxValuesFailure({error: err.error}));
            })
        ))
        )
    );


    constructor(private actions$: Actions, private announcementService: AnnouncementService) {}

}
