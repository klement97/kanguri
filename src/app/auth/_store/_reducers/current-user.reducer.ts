import {Action, createReducer, on} from '@ngrx/store';
import * as CurrentUserActions     from '../_actions/current-user.actions';
import {UserModel}                 from '../_models/user.model';

export const currentUserFeatureKey = 'currentUser';

export interface State {
	loading: boolean;
	currentUser: UserModel;
	loginError: any;
	signUpError: any;
}

export const initialState: State = {
	loading    : false,
	currentUser: null,
	loginError : null,
	signUpError: null,
};

const currentUserReducer = createReducer(
	initialState,

	// sign up
	on(CurrentUserActions.createUser,
		state => ({...state, loading: true})
	),
	on(CurrentUserActions.createUserSuccess,
		(state, {userData}) => ({...state, loading: false, signUpError: null, currentUser: userData})
	),
	on(CurrentUserActions.createUserFailure,
		(state, {error}) => ({...state, loading: false, signUpError: error})
	),
	// --------------------

	// login
	on(CurrentUserActions.login,
		state => ({...state, loading: true})
	),
	on(CurrentUserActions.loginSuccess,
		state => ({...state, loading: false, loginError: null})
	),
	on(CurrentUserActions.loginFailure,
		(state, {error}) => ({...state, loading: false, loginError: error})
	),
	// -----------------------

	// Current user details
	on(CurrentUserActions.getCurrentUserDetailsSuccess,
		(state, {user}) => ({...state, currentUser: user})
	),
	on(CurrentUserActions.getCurrentUserDetailsFailure,
		(state, {error}) => ({...state, error})
	),
	on(CurrentUserActions.clearCurrentUser,
		state => ({...state, currentUser: null})
	),
	// -------------------------
);

export function reducer(state: State | undefined, action: Action) {
	return currentUserReducer(state, action);
}
