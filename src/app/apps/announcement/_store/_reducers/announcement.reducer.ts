import {Action, createReducer, on} from '@ngrx/store';
import {createEntityAdapter, EntityAdapter, EntityState, Update} from '@ngrx/entity';
import {Announcement} from 'src/app/apps/announcement/_store/_models/announcement.model';
import * as AnnouncementActions from 'src/app/apps/announcement/_store/_actions/announcement.actions';
import {ErrorResponse} from 'src/app/common/const';


export const announcementsFeatureKey = 'announcements';


export interface State extends EntityState<Announcement> {
    loading: boolean;
    error: ErrorResponse;
    count: number;
    announcement: Announcement;
}


export const adapter: EntityAdapter<Announcement> = createEntityAdapter<Announcement>();

export const initialState: State = adapter.getInitialState({
    loading: false,
    error: null,
    count: 0,
    announcement: null
});

const announcementReducer = createReducer(
    initialState,
    on(AnnouncementActions.addAnnouncement,
        state => ({...state, loading: true})
    ),
    on(AnnouncementActions.addAnnouncementSuccess,
        (state, {announcement}) => adapter
            .addOne(announcement, {...state, loading: false, error: null})
    ),
    on(AnnouncementActions.addAnnouncementFailure,
        (state, {error}) => ({...state, loading: false, error})
    ),
    on(AnnouncementActions.upsertAnnouncement,
        (state, action) => adapter
            .upsertOne(action.announcement, state)
    ),
    on(AnnouncementActions.updateAnnouncement,
        (state, action) => ({...state, loading: true})
    ),
    on(AnnouncementActions.updateAnnouncementSuccess,
        (state, {announcement}) => adapter
            .updateOne(announcement, {...state, loading: false, error: null})
    ),
    on(AnnouncementActions.updateAnnouncementFailure,
        (state, {error}) => ({...state, loading: false, error})
    ),
    on(AnnouncementActions.deleteAnnouncement,
        (state, {id}) => ({...state, loading: true})
    ),
    on(AnnouncementActions.deleteAnnouncementSuccess,
        (state, {id}) => adapter
            .removeOne(id, {...state, loading: false, error: null})
    ),
    on(AnnouncementActions.loadAnnouncements,
        state => ({...state, loading: true})
    ),
    on(AnnouncementActions.loadAnnouncementsSuccess,
        (state, {announcements, count}) => adapter
            .addAll(announcements, {...state, count, loading: false, error: null})
    ),
    on(AnnouncementActions.loadAnnouncementsFailure,
        (state, {error}) => ({...state, loading: false, error})
    ),
    on(AnnouncementActions.loadAnnouncement,
        state => ({...state, loading: true})
    ),
    on(AnnouncementActions.loadAnnouncementSuccess,
        (state, {announcement}) => ({...state, loading: false, announcement})
    ),
    on(AnnouncementActions.loadAnnouncementFailure,
        (state, {error}) => ({...state, loading: false, error})
    ),
    on(AnnouncementActions.clearAnnouncements,
        state => adapter.removeAll(state)
    ),
    on(AnnouncementActions.incrementAnnouncementViewsSuccess,
        (state, {id}) => adapter.updateOne(updateAnnouncementViewsCount(id, state), state))
);

function updateAnnouncementViewsCount(id: number, state): Update<Announcement> {
    const oldViewsCount = state.entities[id].views_count;
    return {
        id,
        changes: {
            views_count: oldViewsCount + 1
        }
    };
}

function incrementAnnouncementView(state, id) {
    const newState = {...state};
    console.log(newState);
    newState[id].views_count += 1;
    newState.announcement.views_count += 1;
    return newState.entities;
}

export function reducer(state: State | undefined, action: Action) {
    return announcementReducer(state, action);
}

export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
} = adapter.getSelectors();
