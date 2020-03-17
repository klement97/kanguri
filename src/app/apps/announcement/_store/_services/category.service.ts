import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ENDPOINTS} from 'src/app/common/endpoints';
import {APIResponse} from 'src/app/common/const';
import {Observable} from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    constructor(
        private http: HttpClient
    ) { }

    getCategories(): Observable<APIResponse> {
        return this.http.get<APIResponse>(`${ENDPOINTS.CATEGORY}/`);
    }
}
