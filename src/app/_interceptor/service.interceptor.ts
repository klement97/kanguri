import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {CurrentUserService} from '../apps/auth/_store/_services/current-user.service';
import {Observable} from 'rxjs';


@Injectable()
export class ServiceInterceptor implements HttpInterceptor {
    constructor(
        private userService: CurrentUserService
    ) {
    }

    /**
     * Interceptor for every HttpClient request
     * Intercept requests and set's an Authorization Header with access token
     */
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const {access, refresh, authToken} = this.userService.getJwtFromCookies();
        if (access) {
            request = request.clone({setHeaders: {Authorization: `Bearer ${access}`}});
        } else if (authToken) {
            request = request.clone({setHeaders: {Authorization: `Bearer ${authToken}`}});
        } else if (refresh) {
            //
        }

        return next.handle(request);

        // if (refresh) {
        //     return this.userService.refreshAccessToken().subscribe(
        //         response => {
        //             if (response) {
        //                 request = request.clone({setHeaders: {Authorization: `Bearer ${response.access}`}});
        //                 return next.handle(request);
        //             }
        //         },
        //         () => this.userService.logout());
        // }
    }
}
