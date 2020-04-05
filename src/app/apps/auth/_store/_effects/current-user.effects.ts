import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, exhaustMap, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';

import * as CurrentUserActions from 'src/app/apps/auth/_store/_actions/current-user.actions';
import {CurrentUserService} from 'src/app/apps/auth/_store/_services/current-user.service';
import {UserModel} from 'src/app/apps/auth/_store/_models/user.model';
import {MatSnackBar} from '@angular/material/snack-bar';


@Injectable()
export class CurrentUserEffects {

    createUser$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(CurrentUserActions.createUser),
            exhaustMap(({userData}) => this.currentUserService.createUser(userData).pipe(
                map(response => {
                    this.currentUserService.loginAfterSignUp(userData.email, userData.password);
                    return CurrentUserActions.createUserSuccess({userData: response});
                }),
                catchError(err => of(CurrentUserActions.createUserFailure({error: err.error})))
            ))
        );
    });

    updateCurrentUser$ = createEffect(() => this.actions$.pipe(
        ofType(CurrentUserActions.updateCurrentUser),
        exhaustMap(({user}) => this.currentUserService.updateCurrentUser(user).pipe(
            map(currentUser => {
                this.snackbar.open('Profili u përditësua me sukses.', '', {
                    panelClass: 'success font-wg-400', duration: 3000
                });
                return CurrentUserActions.updateCurrentUserSuccess({user: currentUser});
            }),
            catchError(err => of(CurrentUserActions.updateCurrentUserFailure({error: err.error})))
        ))
    ));

    login$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(CurrentUserActions.login, CurrentUserActions.socialLogin),
            exhaustMap((payload) => this.currentUserService.login(payload).pipe(
                map((jwt) => {
                    this.currentUserService.setJwtToCookies(jwt);
                    return CurrentUserActions.loginSuccess({jwt});
                }),
                catchError(({error}) => of(CurrentUserActions.loginFailure({error})))
            ))
        );
    });


    getCurrentUserDetails$ = createEffect(() => this.actions$.pipe(
        ofType(CurrentUserActions.getCurrentUserDetails),
        switchMap(() => this.currentUserService.getCurrentUserData().pipe(
            map((user: UserModel) => {
                this.currentUserService.setUserDetailsToCookies(user);
                return CurrentUserActions.getCurrentUserDetailsSuccess({user});
            }),
            catchError(error => of(CurrentUserActions.getCurrentUserDetailsFailure({error})))
        ))
    ));


    constructor(private actions$: Actions, private currentUserService: CurrentUserService,
                private snackbar: MatSnackBar) {
    }

}
