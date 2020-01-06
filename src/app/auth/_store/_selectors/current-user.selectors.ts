import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromCurrentUser from '../_reducers/current-user.reducer';

export const selectCurrentUserState = createFeatureSelector<fromCurrentUser.State>(
  fromCurrentUser.currentUserFeatureKey
);

export const selectCurrentUser = createSelector(
  selectCurrentUserState,
  state => state.currentUser
);

export const selectCurrentUserLoading = createSelector(
  selectCurrentUserState,
  state => state.loading
);

export const selectCurrentUserError = createSelector(
  selectCurrentUserState,
  state => state.error
);
