import { Action, createReducer, on } from '@ngrx/store';
import * as CurrentUserActions from '../_actions/current-user.actions';

export const currentUserFeatureKey = 'currentUser';

export interface State {

}

export const initialState: State = {

};

const currentUserReducer = createReducer(
  initialState,

  on(CurrentUserActions.loadCurrentUsers, state => state),
  on(CurrentUserActions.loadCurrentUsersSuccess, (state, action) => state),
  on(CurrentUserActions.loadCurrentUsersFailure, (state, action) => state),

);

export function reducer(state: State | undefined, action: Action) {
  return currentUserReducer(state, action);
}
