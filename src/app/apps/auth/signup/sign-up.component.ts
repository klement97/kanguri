import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromCurrentUser from 'src/app/apps/auth/_store/_reducers/current-user.reducer';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {createUser} from 'src/app/apps/auth/_store/_actions/current-user.actions';
import {ErrorHandler, ServerError} from 'src/app/common/error-handler/error.handler';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {selectSignUpError} from 'src/app/apps/auth/_store/_selectors/current-user.selectors';


@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit, OnDestroy {
    signUpForm: FormGroup;
    errors: any = {};
    private unsubscribe$ = new Subject();

    constructor(
        private store: Store<fromCurrentUser.State>,
        private fb: FormBuilder,
        private errorHandler: ErrorHandler,
    ) {
        store.select(selectSignUpError).pipe(takeUntil(this.unsubscribe$))
        .subscribe((error: ServerError) => errorHandler.organizeServerErrors(error, this.signUpForm));
    }

    ngOnInit() {
        this.initiateSignUpForm();
        this.errorHandler.handleErrors(this.signUpForm, this.errors);
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    initiateSignUpForm() {
        this.signUpForm = this.fb.group({
            first_name: ['', [Validators.required, Validators.maxLength(30)]],
            last_name: ['', [Validators.required, Validators.maxLength(30)]],
            email: ['', [Validators.required, Validators.maxLength(255), Validators.email]],
            password: ['', [Validators.required, Validators.maxLength(128)]],
        });
    }

    submit() {
        if (this.signUpForm.valid) {
            this.store.dispatch(createUser({userData: this.signUpForm.value}));
        } else {
            this.errorHandler.invalidFormHasSubmit();
        }
    }

}
