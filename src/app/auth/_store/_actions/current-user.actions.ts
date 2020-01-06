import {createAction, props} from '@ngrx/store';
import {UserModel} from '../_models/user.model';

export const loadCurrentUsers = createAction(
  '[CurrentUser] Load CurrentUsers'
);

export const loadCurrentUsersSuccess = createAction(
  '[CurrentUser] Load CurrentUsers Success',
  props<{ data: any }>()
);

export const loadCurrentUsersFailure = createAction(
  '[CurrentUser] Load CurrentUsers Failure',
  props<{ error: any }>()
);

export const createUser = createAction(
  '[Sign up] Request to Create New User',
  props<{ userData: UserModel }>()
);

export const createUserSuccess = createAction(
  '[Sign up] Create New User Success',
  props<{ userData: UserModel }>()
);

export const createUserFailure = createAction(
  '[Sign up] Create New User Failure',
  props<{ error }>()
);
