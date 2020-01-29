import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';
import {JwtModel} from 'src/app/common/const';
import {CookieService} from 'ngx-cookie-service';
import {map} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {clearCurrentUser, loadCurrentUser, login} from 'src/app/apps/auth/_store/_actions/current-user.actions';
import {UserModel} from 'src/app/apps/auth/_store/_models/user.model';
import {Observable} from 'rxjs';

const API_HOST = `${environment.apiHost}`;

const AUTH_URL = `${API_HOST}/auth`;
export const USERS_URL = `${AUTH_URL}/users`;
const CURRENT_USER_URL = `${USERS_URL}/me`;

const JWT_URL = `${AUTH_URL}/jwt`;
export const JWT_CREATE_URL = `${JWT_URL}/create`;
export const JWT_REFRESH_URL = `${JWT_URL}/refresh`;
export const JWT_VERIFY_URL = `${JWT_URL}/verify`;

@Injectable({
    providedIn: 'root'
})
export class CurrentUserService {
    /** Service to deal with operations related to Current User */

    constructor(private http: HttpClient, private cookieService: CookieService, private store: Store<any>) {
    }


    /**
     * Makes a POST request to /users/ endpoint to create a new user.
     * @param   userData          An object with at least email and password inside.
     * @return response          Updated user model
     */
    createUser(userData: UserModel): Observable<UserModel> {
        return this.http.post<UserModel>(`${USERS_URL}/`, userData);
    }


    /** Makes a PUT request to update current user. */
    updateCurrentUser(user: UserModel): Observable<UserModel> {
        return this.http.put<UserModel>(`${CURRENT_USER_URL}/`, user);
    }


    /** Makes a get request to get current user's data. */
    currentUserData(): Observable<UserModel> {
        return this.http.get<UserModel>(`${CURRENT_USER_URL}/`);
    }

    /** Makes a post request to receive a pair of tokens. */
    login(email: string, password: string): Observable<JwtModel> {
        return this.http.post<JwtModel>(`${JWT_CREATE_URL}/`, {email, password});
    }


    /** Dispatches an action to login current user with credentials given */
    loginAfterSignUp(email: string, password: string) {
        this.store.dispatch(login({email, password}));
    }


    /**
     *  Makes a request to refresh access token and sets access and refresh from response to cookies.
     *  This method is used automatically by interceptor if access_token has expired. No need to use it manually.
     */
    refreshAccessToken() {
        return this.http.post(`${JWT_REFRESH_URL}/`, {refresh: this.getJwtFromCookies().refresh}).pipe(
            map((jwt: JwtModel) => {
                this.setJwtToCookies(jwt);
                return jwt;
            }));
    }


    /**
     * Takes jwt object and sets two cookies, 'kanguri_access' and 'kanguri_refresh'.
     * Access token lifetime is 1 day, refresh token is 7 days
     *
     * @param jwt         JsonWebToken Object
     */
    setJwtToCookies(jwt: JwtModel) {
        const today = new Date();
        const tomorrow: Date = new Date();
        tomorrow.setDate(today.getDate() + 1);
        const nextWeek: Date = new Date();
        nextWeek.setDate(today.getDate() + 7);

        if (jwt.access) {
            this.cookieService.set('kanguri_access', jwt.access, tomorrow);
        }
        if (jwt.refresh) {
            this.cookieService.set('kanguri_refresh', jwt.refresh, nextWeek);
        }
    }

    /**
     * Takes a user instance and set's it to cookies as kanguri_user.
     * This method is in use on getCurrentUserDetails$ effect.
     * @param user      User Instance
     */
    setUserDetailsToCookies(user: UserModel): void {
        this.cookieService.set('kanguri_user', JSON.stringify(user), 7, '', '', false, 'Lax');
    }


    /**
     * Get kanguri_user from cookies, parses it into an object and returns it.
     * Return null if there is no user.
     * @returns user     Current User details
     */
    getUserDetailsFromCookies(): UserModel {
        const user = this.cookieService.get('kanguri_user');
        if (user) {
            return JSON.parse(user);
        }
        return null;
    }

    /**
     * Get and return access and refresh tokens from cookies.
     * @returns JwtModel Object
     */
    getJwtFromCookies(): JwtModel {
        return {
            access: this.cookieService.get('kanguri_access'),
            refresh: this.cookieService.get('kanguri_refresh')
        };
    }


    /**
     * Logout with JWT does mean anything to server side.
     * We simply delete the JWT from the storage and navigate to login.
     */
    logout() {
        this.cookieService.delete('kanguri_access');
        this.cookieService.delete('kanguri_refresh');
        this.store.dispatch(clearCurrentUser());
    }


    /**
     * Checks if there is an access token in cookies
     * and dispatches action to get currentUser's details
     * from server and load them to the Store.
     */
    loadUserIfLoggedIn() {
        if (this.cookieService.get('kanguri_access') !== null) {
            const user: UserModel = this.getUserDetailsFromCookies();
            this.store.dispatch(loadCurrentUser({user}));
        }
    }

}
