import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';

import * as CurrentUserActions from '../_actions/current-user.actions';



@Injectable()
export class CurrentUserEffects {

  loadCurrentUsers$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(CurrentUserActions.loadCurrentUsers),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        EMPTY.pipe(
          map(data => CurrentUserActions.loadCurrentUsersSuccess({ data })),
          catchError(error => of(CurrentUserActions.loadCurrentUsersFailure({ error }))))
      )
    );
  });



  constructor(private actions$: Actions) {}

}
