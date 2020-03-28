import {createFeatureSelector, createSelector} from '@ngrx/store';
import {favouriteAnnouncementsFeatureKey} from 'src/app/apps/announcement/_store/_reducers/favourite-announcement.reducer';
import * as fromFavAnnouncement from '../_reducers/favourite-announcement.reducer';

export const selectFavouriteAnnouncementState = createFeatureSelector<fromFavAnnouncement.State>(favouriteAnnouncementsFeatureKey);

export const selectAllFavouriteAnnouncements = createSelector(
    selectFavouriteAnnouncementState,
    fromFavAnnouncement.selectAll
);
