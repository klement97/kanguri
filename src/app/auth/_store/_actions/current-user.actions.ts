import {createAction, props} from '@ngrx/store';
import {UserModel} from '../_models/user.model';
import {JwtModel} from '../../../common/const';

// Create User
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
// --------------------------------------------


// Login
export const login = createAction(
	'[Login] Request to Login',
	props<{ email: string, password: string }>()
);

export const loginSuccess = createAction(
	'[Login/API] Login Success',
	props<{ jwt: JwtModel }>()
);

export const loginFailure = createAction(
	'[Login/API] Login Failure',
	props<{ error }>()
);

// Current user details
export const getCurrentUserDetails = createAction(
	'[Landing Page] Get Current User Details',
);

export const getCurrentUserDetailsSuccess = createAction(
	'[User/API] Get Current User Details Success',
	props<{ user: UserModel }>()
);

export const getCurrentUserDetailsFailure = createAction(
	'[User/API] Get Current User Details Failure',
	props<{ error }>()
);

export const clearCurrentUser = createAction(
	'[User] Clear Current User'
);
// -----------------------------
