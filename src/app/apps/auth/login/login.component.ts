import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActionsSubject, Store} from '@ngrx/store';
import * as CurrentUserActions from 'src/app/apps/auth/_store/_actions/current-user.actions';
import * as fromCurrentUser from 'src/app/apps/auth/_store/_reducers/current-user.reducer';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable, Subject} from 'rxjs';
import {selectCurrentUserLoading, selectLoginError} from 'src/app/apps/auth/_store/_selectors/current-user.selectors';
import {ErrorHandler} from 'src/app/common/error.handler';
import {takeUntil} from 'rxjs/operators';
import {CurrentUserService} from 'src/app/apps/auth/_store/_services/current-user.service';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
    showLogin = true;
    showSignUp = false;
    loginForm: FormGroup;
    loading$: Observable<boolean>;
    error$: Observable<any>;
    serverErrorMessage = '';

    uns$ = new Subject();

    constructor(
        private store: Store<fromCurrentUser.State>,
        private fb: FormBuilder,
        private errorHandler: ErrorHandler,
        private service: CurrentUserService,
        private dialogRef: MatDialogRef<LoginComponent>,
        private actions$: ActionsSubject,
    ) {
        this.error$ = store.select(selectLoginError);
        this.loading$ = store.select(selectCurrentUserLoading);
        actions$.pipe(takeUntil(this.uns$)).subscribe((action: any) => {
            if (action.type === CurrentUserActions.loginSuccess.type) {
                this.dialogRef.close(action.jwt);
            }
        });
    }

    toggleLoginSignUp() {
        this.showLogin = !this.showLogin;
        this.showSignUp = !this.showSignUp;
    }

    ngOnInit() {
        this.initiateLoginForm();
        this.listenAndSetServerError();
    }

    ngOnDestroy() {
        this.uns$.complete();
        this.uns$.next();
    }

    initiateLoginForm() {
        this.loginForm = this.fb.group({
            email: ['klementomeri97@gmail.com', [Validators.required, Validators.email, Validators.maxLength(255)]],
            password: ['!Keli1997!@#', [Validators.required]]
        });
    }

    submit() {
        const payload = {
            email: this.loginForm.value.email,
            password: this.loginForm.value.password
        };
        this.store.dispatch(CurrentUserActions.login(payload));
    }

    listenAndSetServerError() {
        this.error$.pipe(takeUntil(this.uns$))
            .subscribe(error => {
                    if (error) {
                        this.serverErrorMessage = 'E-mail ose Password është i gabuar';
                    } else {
                        this.serverErrorMessage = '';
                    }
                }
            );
    }


    getError(field: string) {
        console.log('entered');
        this.loginForm.valueChanges.pipe(takeUntil(this.uns$))
            .subscribe(values => {
                return this.errorHandler.getError(this.loginForm, field);
            });
    }

}
