import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {CurrentUserService} from '../auth/_store/_services/current-user.service';
import {Observable} from 'rxjs';
import {JwtModel, noCredentialsUrls} from '../common/const';

@Injectable()
export class ServiceInterceptor implements HttpInterceptor {
    constructor(private userService: CurrentUserService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!noCredentialsUrls.includes(request.url)) {
            let currentUserJwt: JwtModel = this.userService.getJwtFromCookies();

            if (currentUserJwt) {
                if (currentUserJwt.access) {
                    // If there is an access token then it has not expired yet.
                    request = request.clone({
                        setHeaders: {
                            Authorization: `Bearer ${currentUserJwt.access}`
                        }
                    });
                } else {
                    // Otherwise we use refresh token to get a new access token
                    if (currentUserJwt.refresh) {
                        this.userService.refreshAccessToken().subscribe(
                            response => {
                                if (response) {
                                    request = request.clone({
                                        setHeaders: {
                                            Authorization: `Bearer ${currentUserJwt.access}`
                                        }
                                    });
                                }
                            }
                        );
                    } else {
                        // If there is no refresh token then we should logout the user
                        this.userService.logout();
                    }
                }
            }

        }
        return next.handle(request);
    }
}
