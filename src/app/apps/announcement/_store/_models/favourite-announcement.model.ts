import {Announcement} from 'src/app/apps/announcement/_store/_models/announcement.model';

export interface FavouriteAnnouncement {
    id: number;
    announcement: Announcement;
    date_created: string;
}
