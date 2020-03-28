import {Action, createReducer, on} from '@ngrx/store';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {FavouriteAnnouncement} from 'src/app/apps/announcement/_store/_models/favourite-announcement.model';
import * as FavouriteAnnouncementActions from 'src/app/apps/announcement/_store/_actions/favourite-announcement.actions';

export const favouriteAnnouncementsFeatureKey = 'favouriteAnnouncements';

export interface State extends EntityState<FavouriteAnnouncement> {
    loading: boolean;
    error: any;
}

export const adapter: EntityAdapter<FavouriteAnnouncement> = createEntityAdapter<FavouriteAnnouncement>();

export const initialState: State = adapter.getInitialState({
    loading: false,
    error: null
});

const favouriteAnnouncementReducer = createReducer(
    initialState,
    on(FavouriteAnnouncementActions.loadFavouriteAnnouncements,
        state => ({...state, loading: true})
    ),
    on(FavouriteAnnouncementActions.loadFavouriteAnnouncementsSuccess,
        (state, {favouriteAnnouncements}) =>
            adapter.setAll(favouriteAnnouncements, {...state, loading: false, error: null})
    ),
    on(FavouriteAnnouncementActions.loadFavouriteAnnouncementsFailure,
        (state, {error}) => ({...state, loading: false, error})
    ),
    on(FavouriteAnnouncementActions.clearFavouriteAnnouncements,
        state => adapter.removeAll(state)
    ),
);

export function reducer(state: State | undefined, action: Action) {
    return favouriteAnnouncementReducer(state, action);
}

export const {
                 selectIds,
                 selectEntities,
                 selectAll,
                 selectTotal,
             } = adapter.getSelectors();
