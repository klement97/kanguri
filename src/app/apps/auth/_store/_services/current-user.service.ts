import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {JwtModel, KANGURI_ACCESS, KANGURI_REFRESH, KANGURI_USER} from 'src/app/common/const';
import {CookieService} from 'ngx-cookie-service';
import {map} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {clearCurrentUser, getCurrentUserDetails, loadCurrentUser, login} from 'src/app/apps/auth/_store/_actions/current-user.actions';
import {UserModel} from 'src/app/apps/auth/_store/_models/user.model';
import {Observable} from 'rxjs';
import {ENDPOINTS} from 'src/app/common/endpoints';


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
        return this.http.post<UserModel>(`${ENDPOINTS.USERS}/`, userData);
    }


    /** Makes a PUT request to update current user. */
    updateCurrentUser(user: UserModel): Observable<UserModel> {
        return this.http.put<UserModel>(`${ENDPOINTS.CURRENT_USER}/`, user);
    }


    /** Makes a get request to get current user's data. */
    getCurrentUserData(): Observable<UserModel> {
        return this.http.get<UserModel>(`${ENDPOINTS.CURRENT_USER}/`);
    }

    /** Makes a post request to receive a pair of tokens. */
    login(email: string, password: string): Observable<JwtModel> {
        return this.http.post<JwtModel>(`${ENDPOINTS.JWT_CREATE}/`, {email, password});
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
        return this.http.post(`${ENDPOINTS.JWT_REFRESH}/`, {refresh: this.getJwtFromCookies().refresh}).pipe(
            map((jwt: JwtModel) => {
                this.setJwtToCookies(jwt);
                return jwt;
            }));
    }


    /**
     * Takes jwt object and sets two cookies, KANGURI_ACCESS and KANGURI_REFRESH.
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
            this.cookieService.set(KANGURI_ACCESS, jwt.access, tomorrow, '', '', false, 'Strict');
        }
        if (jwt.refresh) {
            this.cookieService.set(KANGURI_REFRESH, jwt.refresh, nextWeek, '', '', false, 'Strict');
        }
    }

    /**
     * Takes a user instance and set's it to cookies as kanguri_user.
     * @param user      User Instance
     */
    setUserDetailsToCookies(user: UserModel): void {
        this.cookieService.set(KANGURI_USER, JSON.stringify(user), 7, '', '', false, 'Strict');
    }


    /**
     * Get kanguri_user from cookies, parses it into an object and returns it.
     * Return null if there is no user.
     * @returns user     Current User details
     */
    getUserDetailsFromCookies(): UserModel {
        const user = this.cookieService.get(KANGURI_USER);
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
            access: this.cookieService.get(KANGURI_ACCESS),
            refresh: this.cookieService.get(KANGURI_REFRESH)
        };
    }


    /**
     * Logout with JWT does mean anything to server side.
     * We simply delete the JWT from the storage and navigate to login.
     */
    logout() {
        this.cookieService.delete(KANGURI_ACCESS);
        this.cookieService.delete(KANGURI_REFRESH);
        this.cookieService.delete(KANGURI_USER);
        this.store.dispatch(clearCurrentUser());
    }


    /**
     * Checks if there is an access token in cookies
     * and dispatches action to get currentUser's details
     * from server and load them to the Store.
     */
    loadUserIfLoggedIn() {
        if (this.cookieService.get(KANGURI_ACCESS) !== null) {
            const user: UserModel = this.getUserDetailsFromCookies();
            if (user) {
                this.store.dispatch(loadCurrentUser({user}));
            } else {
                this.store.dispatch(getCurrentUserDetails());
            }
        }
    }

}
