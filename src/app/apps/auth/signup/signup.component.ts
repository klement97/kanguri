import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromCurrentUser from 'src/app/apps/auth/_store/_reducers/current-user.reducer';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {createUser} from 'src/app/apps/auth/_store/_actions/current-user.actions';
import {ErrorHandler} from 'src/app/common/error.handler';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {selectSignUpError} from 'src/app/apps/auth/_store/_selectors/current-user.selectors';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit, OnDestroy {
    signupForm: FormGroup;

    uns$ = new Subject();

    constructor(
        private store: Store<fromCurrentUser.State>,
        private fb: FormBuilder,
        private errorHandler: ErrorHandler,
    ) {
        store.select(selectSignUpError).pipe(takeUntil(this.uns$)).subscribe(error => this.setError(error));
    }

    ngOnInit() {
        this.initiateSignupForm();
    }

    ngOnDestroy(): void {
        this.uns$.next();
        this.uns$.complete();
    }

    initiateSignupForm() {
        this.signupForm = this.fb.group({
            first_name: ['', [Validators.required, Validators.maxLength(30)]],
            last_name: ['', [Validators.required, Validators.maxLength(30)]],
            email: ['', [Validators.required, Validators.maxLength(255), Validators.email]],
            password: ['', [Validators.required, Validators.maxLength(128)]],
        });
    }

    submit() {this.store.dispatch(createUser({userData: this.signupForm.value})); }

    getError(field: string): string {return this.errorHandler.getError(this.signupForm, field); }

    hasError(field: string): boolean {return this.errorHandler.hasError(this.signupForm.get(field)); }

    setError(error): void {this.errorHandler.setError(error, this.signupForm); }

}
