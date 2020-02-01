import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {CurrentUserService} from '../apps/auth/_store/_services/current-user.service';
import {Observable} from 'rxjs';
import {NO_TOKEN_ENDPOINTS} from '../common/const';

@Injectable()
export class ServiceInterceptor implements HttpInterceptor {
    constructor(private userService: CurrentUserService) {
    }

    /**
     * Interceptor for every HttpClient request
     * Intercept requests and set's an Authorization Header with access token
     */
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        /** Some url's like jwt/create, refresh or verify does not require headers to be set */
        if (NO_TOKEN_ENDPOINTS.includes(request.url)) {
            return next.handle(request);
        }

        const {access, refresh} = this.userService.getJwtFromCookies();
        /** If there is an access token then it has not expired yet */
        if (access) {
            request = request.clone({setHeaders: {Authorization: `Bearer ${access}`}});
            return next.handle(request);
        }

        /** If there is no access but refresh, we use that refresh to get a new access token. */
        if (refresh) {
            this.userService.refreshAccessToken().subscribe(
                response => {
                    if (response) {
                        request = request.clone({setHeaders: {Authorization: `Bearer ${response.access}`}});
                        return next.handle(request);
                    }
                },
                () => this.userService.logout());
        }

        /** If there are neither access nor refresh we must log the user out! */
        this.userService.logout();
    }
}
