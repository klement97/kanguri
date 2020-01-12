import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {JwtModel} from '../../../common/const';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';

const API_HOST = `${environment.apiHost}`;

const AUTH_URL = `${API_HOST}/auth`;
const USERS_URL = `${AUTH_URL}/users`;
const CURRENT_USER_URL = `${USERS_URL}/me`;

const JWT_URL = `${AUTH_URL}/jwt`;
export const JWT_CREATE_URL = `${JWT_URL}/create`;
export const JWT_REFRESH_URL = `${JWT_URL}/refresh`;
export const JWT_VERIFY_URL = `${JWT_URL}/verify`;

@Injectable({
    providedIn: 'root'
})
export class CurrentUserService {

    constructor(private http: HttpClient, private cookieService: CookieService, private router: Router) {
    }

    createUser(userData) {
        /** Makes a POST request to /users/ endpoint to create a new user.
         * @param: userData - an object with at least email and password inside.
         */
        return this.http.post(`${USERS_URL}/`, userData);
    }

    currentUserData() {
        /**
         * Makes a GET request to /users/me to get current user's data
         */
        return this.http.get(`${CURRENT_USER_URL}/`);
    }

    login(email: string, password: string) {
        return this.http.post(`${JWT_CREATE_URL}/`, {email, password});
    }

    refreshAccessToken() {
        return this.http.post(`${JWT_REFRESH_URL}/`, {refresh: this.getJwtFromCookies().refresh}).pipe(
            map((jwt: JwtModel) => {
                this.setJwtToCookies(jwt);
                return jwt;
            })
        );
    }

    setJwtToCookies(jwt: JwtModel) {
        // if (jwt.access) {
        //     this.cookieService.set('access', jwt.access, 1);
        // }
        if (jwt.access) {
            const tomorrow: Date = new Date();
            tomorrow.setSeconds(new Date().getSeconds() + 1);
            this.cookieService.set('access', jwt.access, tomorrow);
        }
        if (jwt.refresh) {
            this.cookieService.set('refresh', jwt.refresh, 7);
        }
    }

    getJwtFromCookies(): JwtModel {
        return {
            access: this.cookieService.get('access'),
            refresh: this.cookieService.get('refresh')
        };
    }

    logout(): void {
        /**
         * Logout with JWT does mean anything to server side.
         * We simply delete the JWT from the storage and navigate to login.
         */
        this.cookieService.delete('access');
        this.cookieService.delete('refresh');
        this.router.navigate(['/auth/login']).then();
    }
}
