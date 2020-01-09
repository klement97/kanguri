import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {CurrentUserService} from '../auth/_store/_services/current-user.service';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable()
export class ServiceInterceptor implements HttpInterceptor {
    constructor(private userService: CurrentUserService) {
    }

    private accessToken: string;

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('enter interceptor');

        const currentUserJwt = this.userService.getJwtFromCookies();

        if (currentUserJwt) {
            this.accessToken = currentUserJwt.access;
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${this.accessToken}`
                }
            });
        }


        return next.handle(request)
            .pipe(
                catchError(err => {
                    if (err && err.code === 'token_not_valid') {
                        // this.userService.refreshAccessToken();
                    }
                    console.log(err);
                    return throwError(err);
                })
            );
    }
}
