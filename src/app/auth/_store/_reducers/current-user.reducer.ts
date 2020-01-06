import {Action, createReducer, on} from '@ngrx/store';
import * as CurrentUserActions from '../_actions/current-user.actions';
import {UserModel} from '../_models/user.model';

export const currentUserFeatureKey = 'currentUser';

export interface State {
  loading: boolean;
  currentUser: UserModel;
  error: any;
}

export const initialState: State = {
  loading: false,
  currentUser: null,
  error: null,
};

const currentUserReducer = createReducer(
  initialState,

  on(CurrentUserActions.loadCurrentUsers, state => state),
  on(CurrentUserActions.loadCurrentUsersSuccess, (state, action) => state),
  on(CurrentUserActions.loadCurrentUsersFailure, (state, action) => state),

  on(CurrentUserActions.createUser,
    state => ({...state, loading: true})
  ),
  on(CurrentUserActions.createUserSuccess,
    (state, action) =>
      ({...state, loading: false, error: null, currentUser: action.userData})
  ),
  on(CurrentUserActions.createUserFailure,
    (state, action) =>
      ({...state, loading: false, error: action.error})
  ),
);

export function reducer(state: State | undefined, action: Action) {
  return currentUserReducer(state, action);
}
