import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ENDPOINTS} from 'src/app/common/endpoints';

@Injectable({
    providedIn: 'root'
})
export class FavouriteAnnouncementService {

    constructor(
        private http: HttpClient
    ) { }

    getFavAnnouncements(): Observable<any> {
        return this.http.get(`${ENDPOINTS.FAV_ANNOUNCEMENT}/`);
    }

    addAnnouncementToFavourites(announcement_id: number): Observable<any> {
        return this.http.post(`${ENDPOINTS.FAV_ANNOUNCEMENT}/`, {announcement: announcement_id});
    }
}
