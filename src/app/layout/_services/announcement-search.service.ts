import {Injectable} from '@angular/core';
import {HttpBackend, HttpClient} from '@angular/common/http';
import {ENDPOINTS} from 'src/app/common/endpoints';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AnnouncementSearchService {
    private httpWithoutInterceptor;

    constructor(private httpBackend: HttpBackend) {
        this.httpWithoutInterceptor = new HttpClient(httpBackend);
    }

    search(name: string): Observable<any> {
        return this.httpWithoutInterceptor.get(`${ENDPOINTS.ANNOUNCEMENT_SEARCH}/?name=${name}`);
    }
}
