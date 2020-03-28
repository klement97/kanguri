import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {FavouriteAnnouncementService} from 'src/app/apps/announcement/_store/_services/favourite-announcement.service';
import {
    loadFavouriteAnnouncements,
    loadFavouriteAnnouncementsFailure,
    loadFavouriteAnnouncementsSuccess
} from 'src/app/apps/announcement/_store/_actions/favourite-announcement.actions';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';


@Injectable()
export class FavouriteAnnouncementEffects {


    constructor(private actions$: Actions, private service: FavouriteAnnouncementService) {}

    loadAllFavAnnouncements$ = createEffect(() => this.actions$.pipe(
        ofType(loadFavouriteAnnouncements),
        switchMap(() => this.service.getFavAnnouncements().pipe(
            map(res => loadFavouriteAnnouncementsSuccess({favouriteAnnouncements: res.data})),
            catchError(error => of(loadFavouriteAnnouncementsFailure({error})))
        ))
    ));

}
