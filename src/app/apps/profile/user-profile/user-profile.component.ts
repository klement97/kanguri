import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
	selector: 'app-user-profile',
	templateUrl: './user-profile.component.html',
	styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
	userForm: FormGroup;

	constructor(
		private store: Store<any>,
		private fb: FormBuilder
	) { }

	ngOnInit() {
		this.initiateUserForm();
	}

	initiateUserForm() {
		this.userForm = this.fb.group({
			first_name: ['', [Validators.required, Validators.maxLength(30)]],
			last_name: ['', [Validators.required, Validators.maxLength(30)]],
			email: ['', [Validators.required, Validators.maxLength(255)]],
			image: [null, []],
			phone: ['', [Validators.maxLength(20)]],
			address_line: ['', [Validators.maxLength(50)]],
			city: [null, []]
		});
	}

}
