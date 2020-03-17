import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromAnnouncementMinMaxValues from 'src/app/apps/announcement/_store/_reducers/announcement-min-max-values.reducer';


export const selectAnnouncementMinMaxValuesState = createFeatureSelector<fromAnnouncementMinMaxValues.State>(
    fromAnnouncementMinMaxValues.announcementMinMaxValuesFeatureKey
);

export const selectAnnouncementMinMaxValues = createSelector(
    selectAnnouncementMinMaxValuesState,
    state => state.data
);
