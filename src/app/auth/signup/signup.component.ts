import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromCurrentUser from 'src/app/auth/_store/_reducers/current-user.reducer';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {createUser} from '../_store/_actions/current-user.actions';
import {ErrorHandler} from '../../common/error.handler';

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
	signupForm: FormGroup;

	constructor(
		private store: Store<fromCurrentUser.State>,
		private fb: FormBuilder,
		private errorHandler: ErrorHandler
	) {
	}

	ngOnInit() {
		this.initiateSignupForm();
	}

	initiateSignupForm() {
		this.signupForm = this.fb.group({
			first_name: ['', [Validators.required, Validators.maxLength(30)]],
			last_name: ['', [Validators.required, Validators.maxLength(30)]],
			email: ['', [Validators.required, Validators.maxLength(255), Validators.email]],
			password: ['', [Validators.required, Validators.maxLength(128)]]
		});
	}

	submit() {
		this.store.dispatch(createUser({userData: this.signupForm.value}));
	}

	getError(field: string): string {return this.errorHandler.getError(this.signupForm, field);}

	hasError(field: string): boolean {return this.errorHandler.hasError(this.signupForm.get(field));}

}
