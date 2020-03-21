import {Injectable} from '@angular/core';
import {HttpBackend, HttpClient} from '@angular/common/http';
import {ENDPOINTS} from 'src/app/common/endpoints';
import {APIResponse, buildQueryString, QueryParam} from 'src/app/common/const';
import {Observable} from 'rxjs';
import {MatPaginator} from '@angular/material/paginator';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


@Injectable({
    providedIn: 'root'
})
export class AnnouncementService {
    announcementPaginator: MatPaginator;
    announcementFilterForm: FormGroup = this.buildFilterForm();
    private httpWithoutInterceptor: HttpClient;

    constructor(
        private httpBackEnd: HttpBackend,
        private fb: FormBuilder
    ) {
        this.httpWithoutInterceptor = new HttpClient(httpBackEnd);
    }

    /** Makes request to API to get all announcements with required page and filter */
    getAnnouncements(): Observable<APIResponse> {
        const payload: QueryParam = this.buildQueryParams();
        const url = `${ENDPOINTS.ANNOUNCEMENT}/${buildQueryString(payload)}`;

        return this.httpWithoutInterceptor.get<APIResponse>(url);
    }

    /** Makes a request to API to get an announcement by its ID */
    getAnnouncement(id: number) {
        return this.httpWithoutInterceptor.get<APIResponse>(`${ENDPOINTS.ANNOUNCEMENT}/${id}/`);
    }


    getAnnouncementMinMaxValues(): Observable<any> {
        const url = `${ENDPOINTS.ANNOUNCEMENT_MIN_MAX_VALUES}/`;
        // const request = new HttpRequest('GET', url);
        return this.httpWithoutInterceptor.get(url);
    }


    setPaginator(paginator: MatPaginator) {
        this.announcementPaginator = paginator;
    }

    getFilterForm() {
        return this.announcementFilterForm;
    }

    resetFilterForm(): FormGroup {
        this.announcementFilterForm = this.buildFilterForm();
        return this.announcementFilterForm;
    }

    private buildFilterForm(): FormGroup {
        return this.fb.group({
            name: ['', [Validators.maxLength(255)]],
            price_min: 0,
            price_max: 10000,
            category: null,
            date_created_min: null,
            date_created_max: null,
            sort_field: '',
            sort: 'asc'
        });
    }

    private buildQueryParams(): QueryParam {
        return {
            page: this.announcementPaginator?.pageIndex,
            pageSize: this.announcementPaginator?.pageSize,
            filter: this.announcementFilterForm.value,
            sort_field: this.announcementFilterForm.value.sort_field,
            sort: this.announcementFilterForm.value.sort
        };
    }
}
