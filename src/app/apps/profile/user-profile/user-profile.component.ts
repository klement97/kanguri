import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {UserModel} from 'src/app/apps/auth/_store/_models/user.model';
import {selectCurrentUser, selectUpdateUserError} from 'src/app/apps/auth/_store/_selectors/current-user.selectors';
import {CITIES} from 'src/app/common/const';
import {updateCurrentUser} from 'src/app/apps/auth/_store/_actions/current-user.actions';
import {ErrorHandler} from 'src/app/common/error-handler/error.handler';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
    userForm: FormGroup;
    currentUser$: Observable<UserModel>;
    cities = CITIES;
    errors: any = {
        aliases: []
    };

    constructor(
        private store: Store<any>,
        private builder: FormBuilder,
        private errorHandler: ErrorHandler
    ) {
        this.currentUser$ = store.select(selectCurrentUser);
        store.select(selectUpdateUserError)
        .subscribe(error => this.errorHandler.organizeServerErrors(error, this.userForm));
    }

    ngOnInit() {
        this.initiateUserForm();
        this.patchUserToForm();
        this.errorHandler.handleErrors(this.userForm, this.errors);
    }

    initiateUserForm() {
        this.userForm = this.builder.group({
            first_name: ['', [Validators.required, Validators.maxLength(30)]],
            last_name: ['', [Validators.required, Validators.maxLength(30)]],
            email: ['', [Validators.required, Validators.maxLength(255), Validators.email]],
            // image: [user.image, []],
            phone: ['', [Validators.maxLength(20)]],
            address_line: ['', [Validators.maxLength(50)]],
            city: ['', []],
            aliases: this.builder.array([])
        });
    }

    get aliases() {
        return this.userForm.get('aliases') as FormArray;
    }

    addAlias() {
        this.aliases.push(this.getNewAlias());
    }

    getNewAlias(): FormGroup {
        return this.builder.group({
            long_name: ['', [Validators.required, Validators.maxLength(10)]],
            short_name: ['', [Validators.required, Validators.maxLength(10)]]
        });
    }

    patchUserToForm() {
        this.currentUser$.subscribe(user => {
            this.userForm.patchValue(user);
        });
    }

    submit() {
        if (this.userForm.valid) {
            this.store.dispatch(updateCurrentUser({user: this.userForm.value}));
        } else {
            this.userForm.markAllAsTouched();
        }
    }

}
