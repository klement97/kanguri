import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, concatMap, exhaust, exhaustMap} from 'rxjs/operators';
import {EMPTY, of} from 'rxjs';

import * as CurrentUserActions from '../_actions/current-user.actions';
import {CurrentUserService} from '../_services/current-user.service';


@Injectable()
export class CurrentUserEffects {

  loadCurrentUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CurrentUserActions.loadCurrentUsers),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        EMPTY.pipe(
          map(data => CurrentUserActions.loadCurrentUsersSuccess({data})),
          catchError(error => of(CurrentUserActions.loadCurrentUsersFailure({error}))))
      )
    );
  });

  createUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CurrentUserActions.createUser),
      exhaustMap(payload => this.currentUserService.createUser(payload).pipe(
        map((response: any) => CurrentUserActions.createUserSuccess({userData: response})),
        catchError(error => of(CurrentUserActions.createUserFailure({error})))
      ))
    );
  });


  constructor(private actions$: Actions, private currentUserService: CurrentUserService) {
  }

}
