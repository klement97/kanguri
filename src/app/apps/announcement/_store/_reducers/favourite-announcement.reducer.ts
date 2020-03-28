import {Action, createReducer, on} from '@ngrx/store';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {FavouriteAnnouncement} from 'src/app/apps/announcement/_store/_models/favourite-announcement.model';
import * as FavouriteAnnouncementActions from 'src/app/apps/announcement/_store/_actions/favourite-announcement.actions';

export const favouriteAnnouncementsFeatureKey = 'favouriteAnnouncements';

export interface State extends EntityState<FavouriteAnnouncement> {
  // additional entities state properties
}

export const adapter: EntityAdapter<FavouriteAnnouncement> = createEntityAdapter<FavouriteAnnouncement>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

const favouriteAnnouncementReducer = createReducer(
    initialState,
    on(FavouriteAnnouncementActions.addFavouriteAnnouncement,
        (state, action) => adapter.addOne(action.favouriteAnnouncement, state)
    ),
    on(FavouriteAnnouncementActions.upsertFavouriteAnnouncement,
        (state, action) => adapter.upsertOne(action.favouriteAnnouncement, state)
    ),
    on(FavouriteAnnouncementActions.addFavouriteAnnouncements,
        (state, action) => adapter.addMany(action.favouriteAnnouncements, state)
    ),
    on(FavouriteAnnouncementActions.upsertFavouriteAnnouncements,
        (state, action) => adapter.upsertMany(action.favouriteAnnouncements, state)
    ),
    on(FavouriteAnnouncementActions.updateFavouriteAnnouncement,
        (state, action) => adapter.updateOne(action.favouriteAnnouncement, state)
    ),
    on(FavouriteAnnouncementActions.updateFavouriteAnnouncements,
        (state, action) => adapter.updateMany(action.favouriteAnnouncements, state)
    ),
    on(FavouriteAnnouncementActions.deleteFavouriteAnnouncement,
        (state, action) => adapter.removeOne(action.id, state)
    ),
    on(FavouriteAnnouncementActions.deleteFavouriteAnnouncements,
        (state, action) => adapter.removeMany(action.ids, state)
    ),
    on(FavouriteAnnouncementActions.loadFavouriteAnnouncements,
        (state, action) => adapter.setAll(action.favouriteAnnouncements, state)
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
