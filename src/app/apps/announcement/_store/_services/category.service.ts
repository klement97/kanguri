import {Injectable} from '@angular/core';
import {HttpBackend, HttpClient} from '@angular/common/http';
import {ENDPOINTS} from 'src/app/common/endpoints';
import {Observable} from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    httpWithoutInterceptor;

    constructor(
            private httpBackEnd: HttpBackend
    ) {
        this.httpWithoutInterceptor = new HttpClient(httpBackEnd);
    }

    getCategories(): Observable<any> {
        return this.httpWithoutInterceptor.get(`${ENDPOINTS.CATEGORY}/`);
    }
}
