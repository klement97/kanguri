import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActionsSubject, Store} from '@ngrx/store';
import * as CurrentUserActions from '../_store/_actions/current-user.actions';
import * as fromCurrentUser from '../_store/_reducers/current-user.reducer';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable, Subject} from 'rxjs';
import {selectCurrentUserError, selectCurrentUserLoading} from '../_store/_selectors/current-user.selectors';
import {ErrorHandler} from '../../common/error.handler';
import {takeUntil} from 'rxjs/operators';
import {CurrentUserService} from '../_store/_services/current-user.service';
import {MatDialogRef} from '@angular/material';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
    loginForm: FormGroup;
    loading$: Observable<boolean>;
    error$: Observable<any>;
    serverErrorMessage: string = '';

    uns$ = new Subject();

    constructor(private store: Store<fromCurrentUser.State>,
                private fb: FormBuilder,
                private errorHandler: ErrorHandler,
                private service: CurrentUserService,
                private dialogRef: MatDialogRef<LoginComponent>,
                private actions$: ActionsSubject
    ) {
        this.error$ = store.select(selectCurrentUserError);
        this.loading$ = store.select(selectCurrentUserLoading);
        actions$.pipe(takeUntil(this.uns$)).subscribe(action => {
            if (action.type === CurrentUserActions.loginSuccess.type) {
                this.dialogRef.close(action['jwt']);
                console.log('Dialog closed');
            }
        });
    }

    ngOnInit() {
        this.initiateLoginForm();
        this.listenAndSetServerError();
        setTimeout(() => {
            this.service.currentUserData().subscribe(res => console.log(res));
        }, 3000);
    }

    ngOnDestroy() {
        this.uns$.complete();
        this.uns$.next();
    }

    initiateLoginForm() {
        this.loginForm = this.fb.group({
            email: ['klementomeri97@gmail.com', [Validators.required, Validators.email, Validators.maxLength(255)]],
            password: ['Test2019!', [Validators.required]]
        });
    }

    submit() {
        this.store.dispatch(CurrentUserActions.login({
            email: this.loginForm.value.email,
            password: this.loginForm.value.password
        }));
    }

    listenAndSetServerError() {
        this.error$.pipe(takeUntil(this.uns$)).subscribe(
            error => {
                if (error) {
                    // todo: handle error here, for this case only a message is enough
                    this.serverErrorMessage = 'E-mail ose Password është i gabuar';
                } else {
                    this.serverErrorMessage = '';
                }
            }
        );
    }


    getError(field: string): string {
        return this.errorHandler.getError(this.loginForm, field);
    }

    setError(error) {
        this.errorHandler.setError(error, this.loginForm);
    }

    hasError(field: string): boolean {
        return this.errorHandler.hasError(this.loginForm.get(field));
    }

}
