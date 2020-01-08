import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, exhaustMap, map} from 'rxjs/operators';
import {of} from 'rxjs';

import * as CurrentUserActions from '../_actions/current-user.actions';
import {CurrentUserService} from '../_services/current-user.service';
import {JwtModel} from '../../../common/const';


@Injectable()
export class CurrentUserEffects {

    createUser$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(CurrentUserActions.createUser),
            exhaustMap(payload => this.currentUserService.createUser(payload.userData).pipe(
                map((response: any) => CurrentUserActions.createUserSuccess({userData: response})),
                catchError(error => of(CurrentUserActions.createUserFailure({error})))
            ))
        );
    });

    login$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(CurrentUserActions.login),
            exhaustMap(({email, password}) => this.currentUserService.login(email, password).pipe(
                map((jwt: JwtModel) => {
                    this.currentUserService.setJwtToCookies(jwt);
                    return CurrentUserActions.loginSuccess({jwt});
                }),
                catchError(({error}) => of(CurrentUserActions.loginFailure({error})))
            ))
        );
    });


    constructor(private actions$: Actions, private currentUserService: CurrentUserService) {
    }

}
