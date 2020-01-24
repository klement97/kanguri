import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromCurrentUser from 'src/app/apps/auth/_store/_reducers/current-user.reducer';

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

export const selectLoginError = createSelector(
    selectCurrentUserState,
    state => state.loginError
);

export const selectSignUpError = createSelector(
    selectCurrentUserState,
    state => state.signUpError
);

export const selectUpdateUserError = createSelector(
    selectCurrentUserState,
    state => state.updateUserError
);
