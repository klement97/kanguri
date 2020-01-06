import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCurrentUser from '../_reducers/current-user.reducer';

export const selectCurrentUserState = createFeatureSelector<fromCurrentUser.State>(
  fromCurrentUser.currentUserFeatureKey
);
