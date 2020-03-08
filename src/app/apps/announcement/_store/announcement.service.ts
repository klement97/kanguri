import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ENDPOINTS} from 'src/app/common/endpoints';
import {APIResponse, buildQueryString} from 'src/app/common/const';
import {Observable} from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class AnnouncementService {

    constructor(
        private http: HttpClient
    ) { }

    getAnnouncements(payload): Observable<APIResponse> {
        return this.http.get<APIResponse>(`${ENDPOINTS.ANNOUNCEMENT}/${buildQueryString(payload)}`);
    }

    getAnnouncement(id: number) {
        return this.http.get<APIResponse>(`${ENDPOINTS.ANNOUNCEMENT}/${id}/`);
    }
}
