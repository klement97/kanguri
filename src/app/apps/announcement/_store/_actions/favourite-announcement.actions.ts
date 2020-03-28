import {createAction, props} from '@ngrx/store';
import {Update} from '@ngrx/entity';

import {FavouriteAnnouncement} from 'src/app/apps/announcement/_store/_models/favourite-announcement.model';

export const loadFavouriteAnnouncements = createAction(
    '[FavouriteAnnouncement/API] Load FavouriteAnnouncements',
    props<{ favouriteAnnouncements: FavouriteAnnouncement[] }>()
);

export const addFavouriteAnnouncement = createAction(
    '[FavouriteAnnouncement/API] Add FavouriteAnnouncement',
    props<{ favouriteAnnouncement: FavouriteAnnouncement }>()
);

export const upsertFavouriteAnnouncement = createAction(
    '[FavouriteAnnouncement/API] Upsert FavouriteAnnouncement',
    props<{ favouriteAnnouncement: FavouriteAnnouncement }>()
);

export const addFavouriteAnnouncements = createAction(
    '[FavouriteAnnouncement/API] Add FavouriteAnnouncements',
    props<{ favouriteAnnouncements: FavouriteAnnouncement[] }>()
);

export const upsertFavouriteAnnouncements = createAction(
    '[FavouriteAnnouncement/API] Upsert FavouriteAnnouncements',
    props<{ favouriteAnnouncements: FavouriteAnnouncement[] }>()
);

export const updateFavouriteAnnouncement = createAction(
    '[FavouriteAnnouncement/API] Update FavouriteAnnouncement',
    props<{ favouriteAnnouncement: Update<FavouriteAnnouncement> }>()
);

export const updateFavouriteAnnouncements = createAction(
    '[FavouriteAnnouncement/API] Update FavouriteAnnouncements',
    props<{ favouriteAnnouncements: Update<FavouriteAnnouncement>[] }>()
);

export const deleteFavouriteAnnouncement = createAction(
    '[FavouriteAnnouncement/API] Delete FavouriteAnnouncement',
    props<{ id: string }>()
);

export const deleteFavouriteAnnouncements = createAction(
    '[FavouriteAnnouncement/API] Delete FavouriteAnnouncements',
    props<{ ids: string[] }>()
);

export const clearFavouriteAnnouncements = createAction(
    '[FavouriteAnnouncement/API] Clear FavouriteAnnouncements'
);
