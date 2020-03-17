import {Action, createReducer, on} from '@ngrx/store';
import * as AnnouncementMinMaxValuesActions from 'src/app/apps/announcement/_store/_actions/announcement-min-max-values.actions';
import {AnnouncementMinMaxValues} from 'src/app/apps/announcement/_store/_models/announcement.model';


export const announcementMinMaxValuesFeatureKey = 'announcementMinMaxValues';


export interface State {
  data: AnnouncementMinMaxValues;
  error: any;
}


export const initialState: State = {
  data: null,
  error: null
};

const announcementMinMaxValuesReducer = createReducer(
    initialState,

    on(AnnouncementMinMaxValuesActions.loadAnnouncementMinMaxValuesSuccess,
        (state, {data}) => ({...state, error: null, data})),
    on(AnnouncementMinMaxValuesActions.loadAnnouncementMinMaxValuesFailure,
        (state, {error}) => ({...state, error})),
);

export function reducer(state: State | undefined, action: Action) {
  return announcementMinMaxValuesReducer(state, action);
}
