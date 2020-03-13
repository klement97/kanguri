import {createAction, props} from '@ngrx/store';
import {Update} from '@ngrx/entity';

import {Announcement} from 'src/app/apps/announcement/_store/_models/announcement.model';
import {ErrorResponse} from 'src/app/common/const';


export const loadAnnouncements = createAction(
    '[Announcement] Load Announcements'
);

export const loadAnnouncementsSuccess = createAction(
    '[Announcement/API] Load Announcements Success',
    props<{ announcements: Announcement[], count: number }>()
);

export const loadAnnouncementsFailure = createAction(
    '[Announcement/API] Load Announcements Failure',
    props<{ error }>()
);

export const loadAnnouncement = createAction(
    '[Announcement Details] Load Announcement',
    props<{ id: number }>()
);

export const loadAnnouncementSuccess = createAction(
    '[Announcement/API] Load Announcement Success',
    props<{ announcement: Announcement }>()
);


export const loadAnnouncementFailure = createAction(
    '[Announcement/API] Load Announcement Failure',
    props<{ error: ErrorResponse }>()
);

export const addAnnouncement = createAction(
    '[Announcement Form] Add Announcement',
    props<{ announcement: Announcement }>()
);

export const addAnnouncementSuccess = createAction(
    '[Announcement/API] Add Announcement Success',
    props<{ announcement: Announcement }>()
);

export const addAnnouncementFailure = createAction(
    '[Announcement/API] Add Announcement Failure',
    props<{ error }>()
);

export const upsertAnnouncement = createAction(
    '[Announcement/API] Upsert Announcement',
    props<{ announcement: Announcement }>()
);

export const updateAnnouncement = createAction(
    '[Announcement Form] Update Announcement',
    props<{ announcement: Announcement }>()
);

export const updateAnnouncementSuccess = createAction(
    '[Announcement/API] Update Announcement Success',
    props<{ announcement: Update<Announcement> }>()
);

export const updateAnnouncementFailure = createAction(
    '[Announcement/API] Update Announcement Failure',
    props<{ error }>()
);

export const deleteAnnouncement = createAction(
    '[Announcement] Delete Announcement',
    props<{ id: number }>()
);

export const deleteAnnouncementSuccess = createAction(
    '[Announcement/API] Delete Announcement Success',
    props<{ id: number }>()
);

export const deleteAnnouncementFailure = createAction(
    '[Announcement/API] Delete Announcement Failure',
    props<{ error }>()
);

export const deleteAnnouncements = createAction(
    '[Announcement] Delete Announcements',
    props<{ ids: string[] }>()
);

export const deleteAnnouncementsSuccess = createAction(
    '[Announcement/API] Delete Announcements Success'
);

export const deleteAnnouncementsFailure = createAction(
    '[Announcement/API] Delete Announcements Failure',
    props<{ error }>()
);

export const clearAnnouncements = createAction(
    '[Announcement/API] Clear Announcements'
);
