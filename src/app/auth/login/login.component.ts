import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import * as CurrentUserActions from '../_store/_actions/current-user.actions';
import * as fromCurrentUser from '../_store/_reducers/current-user.reducer';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private store: Store<fromCurrentUser.State>, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.initiateLoginForm();
  }

  initiateLoginForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, Validators.maxLength(255)]],
      password: ['', [Validators.required]]
    });
  }

  submit() {
    this.store.dispatch(CurrentUserActions.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }));
  }

}
