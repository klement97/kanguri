import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {JwtModel} from '../../../common/const';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';

const API_HOST = `${environment.apiHost}`;

const AUTH_URL = `${API_HOST}/auth`;
const USERS_URL = `${AUTH_URL}/users`;
const CURRENT_USER_URL = `${USERS_URL}/me`;

const JWT_URL = `${AUTH_URL}/jwt`;
const JWT_CREATE_URL = `${JWT_URL}/create`;
const JWT_REFRESH_URL = `${JWT_URL}/refresh`;
const JWT_VERIFY_URL = `${JWT_URL}/verify`;

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

    setJwtToCookies(jwt: JwtModel) {
        this.cookieService.set('access', jwt.access);
        this.cookieService.set('refresh', jwt.refresh);
    }

    getJwtFromCookies(): JwtModel {
        return {
            access: this.cookieService.get('access'),
            refresh: this.cookieService.get('refresh')
        };
    }

    logout() {
        /**
         * Logout with JWT does mean anything to server side.
         * We simply delete the JWT from the storage.
         */
        this.cookieService.delete('access');
        this.cookieService.delete('refresh');
        this.router.navigate(['/auth/login']);
    }
}
