import {createAction, props} from '@ngrx/store';

import {FavouriteAnnouncement} from 'src/app/apps/announcement/_store/_models/favourite-announcement.model';

export const loadFavouriteAnnouncements = createAction(
    '[FavouriteAnnouncement] Load FavouriteAnnouncements',
    props<{}>()
);

export const loadFavouriteAnnouncementsSuccess = createAction(
    '[FavouriteAnnouncement/API] Load FavouriteAnnouncements Success',
    props<{ favouriteAnnouncements: FavouriteAnnouncement[] }>()
);

export const loadFavouriteAnnouncementsFailure = createAction(
    '[FavouriteAnnouncement/API] Load FavouriteAnnouncements Failure',
    props<{ error }>()
);

export const addAnnouncementToFavourites = createAction(
    '[Announcement List] Add Announcement to Favourites',
    props<{ announcement_id: number }>()
);

export const addAnnouncementToFavouritesSuccess = createAction(
    '[FavouriteAnnouncement/API] Add Announcement to Favourites Success',
    props<{ announcement_id: number }>()
);

export const addAnnouncementToFavouritesFailure = createAction(
    '[FavouriteAnnouncement/API] Add Announcement to Favourites Failure',
    props<{ error }>()
);

export const removeAnnouncementFromFavourites = createAction(
    '[Announcement List] Remove Announcement From Favourites',
    props<{ id: string }>()
);

export const removeAnnouncementFromFavouritesSuccess = createAction(
    '[FavAnnouncement/API] Remove Announcement From Favourites Success'
);

export const removeAnnouncementFromFavouritesFailure = createAction(
    '[FavAnnouncement/API] Remove Announcement From Favourites Failure',
    props<{ error }>()
);

export const clearFavouriteAnnouncements = createAction(
    '[FavouriteAnnouncement/API] Clear FavouriteAnnouncements'
);
