import {createAction, props} from '@ngrx/store';
import {AnnouncementMinMaxValues} from 'src/app/apps/announcement/_store/_models/announcement.model';


export const loadAnnouncementMinMaxValues = createAction(
    '[AnnouncementMinMaxValues] Load AnnouncementMinMaxValues'
);

export const loadAnnouncementMinMaxValuesSuccess = createAction(
    '[AnnouncementMinMaxValues] Load AnnouncementMinMaxValues Success',
    props<{ data: AnnouncementMinMaxValues }>()
);

export const loadAnnouncementMinMaxValuesFailure = createAction(
    '[AnnouncementMinMaxValues] Load AnnouncementMinMaxValues Failure',
    props<{ error: any }>()
);
