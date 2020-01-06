import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import * as CurrentUserActions from '../_store/_actions/current-user.actions';
import {UserModel} from '../_store/_models/user.model';
import * as fromCurrentUser from '../_store/_reducers/current-user.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private store: Store<fromCurrentUser.State>) {
  }

  ngOnInit() {
    this.createUser();
  }

  createUser() {
    const userData = new UserModel();
    userData.email = 'komeri@it-works.io';
    userData.password = 'Test2019!';
    this.store.dispatch(CurrentUserActions.createUser({userData}));
  }

}
