import {createAction, props} from '@ngrx/store';
import {UserModel} from 'src/app/apps/auth/_store/_models/user.model';
import {JwtModel} from 'src/app/common/const';

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
// -----------------------------------

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

// Update Current User
export const updateCurrentUser = createAction(
    '[Profile Page] Update Current User',
    props<{ user: UserModel }>()
);

export const updateCurrentUserSuccess = createAction(
    '[Users/API] Current User Updated Successfully',
    props<{ user: UserModel }>()
);

export const updateCurrentUserFailure = createAction(
    '[Users/API] Current User Update Failure',
    props<{ error }>()
);

// Load Current User
export const loadCurrentUser = createAction(
    '[App Component] Load User To Store From Cookies',
    props<{ user: UserModel }>()
);
