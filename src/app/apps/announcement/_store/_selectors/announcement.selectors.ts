import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromAnnouncement from 'src/app/apps/announcement/_store/_reducers/announcement.reducer';


export const selectAnnouncementState = createFeatureSelector<fromAnnouncement.State>(fromAnnouncement.announcementsFeatureKey);

export const selectAnnouncements = createSelector(
    selectAnnouncementState,
    fromAnnouncement.selectAll
);

export const selectAnnouncementsCount = createSelector(
    selectAnnouncementState,
    state => state.count
);

export const selectAnnouncementLoading = createSelector(
    selectAnnouncementState,
    state => state.loading
);

export const selectAnnouncementError = createSelector(
    selectAnnouncementState,
    state => state.error
);

export const selectAnnouncement = createSelector(
    selectAnnouncementState,
    state => state.announcement
);
