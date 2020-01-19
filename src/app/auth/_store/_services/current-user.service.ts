import {Injectable}                                     from '@angular/core';
import {environment}                                    from '../../../../environments/environment';
import {HttpClient}                                     from '@angular/common/http';
import {JwtModel}                                       from '../../../common/const';
import {CookieService}                                  from 'ngx-cookie-service';
import {map}                                            from 'rxjs/operators';
import {Store}                                          from '@ngrx/store';
import {clearCurrentUser, getCurrentUserDetails, login} from '../_actions/current-user.actions';
import {UserModel}                                      from '../_models/user.model';

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

	constructor(private http: HttpClient, private cookieService: CookieService, private store: Store<any>) {
	}

	createUser(userData: UserModel) {
		/** Makes a POST request to /users/ endpoint to create a new user.
		 * @param: userData - an object with at least email and password inside.
		 */
		return this.http.post<UserModel>(`${USERS_URL}/`, userData);
	}

	currentUserData() {
		/** Makes a GET request to /users/me to get current user's data */
		return this.http.get(`${CURRENT_USER_URL}/`);
	}

	login(email: string, password: string) {
		/** Makes a post request to receive a pair of tokens. */
		return this.http.post(`${JWT_CREATE_URL}/`, {email, password});
	}

	loginAfterSignUp(email: string, password: string) {
		this.store.dispatch(login({email, password}));
	}

	refreshAccessToken() {
		/** Makes a request to refresh access token and sets access and refresh from response to cookies. */
		return this.http.post(`${JWT_REFRESH_URL}/`, {refresh: this.getJwtFromCookies().refresh}).pipe(
			map((jwt: JwtModel) => {
				this.setJwtToCookies(jwt);
				return jwt;
			})
		);
	}

	setJwtToCookies(jwt: JwtModel) {
		/**
		 * Takes jwt object and sets two cookies, 'kanguri_access' and 'kanguri_refresh'.
		 * Access token lifetime is 1 day, refresh token is 7 days
		 * @param jwt
		 */
		const today = new Date();
		const tomorrow: Date = new Date();
		tomorrow.setDate(today.getDate() + 1);
		const nextWeek: Date = new Date();
		nextWeek.setDate(today.getDate() + 7);
		if (jwt.access) {
			// const tomorrow: Date = new Date();
			// tomorrow.setSeconds(new Date().getSeconds() + 1);
			this.cookieService.set('kanguri_access', jwt.access, tomorrow);
		}
		if (jwt.refresh) {
			this.cookieService.set('kanguri_refresh', jwt.refresh, nextWeek);
		}
	}

	getJwtFromCookies(): JwtModel {
		return {
			access : this.cookieService.get('kanguri_access'),
			refresh: this.cookieService.get('kanguri_refresh')
		};
	}

	logout(): void {
		/**
		 * Logout with JWT does mean anything to server side.
		 * We simply delete the JWT from the storage and navigate to login.
		 */
		this.cookieService.delete('kanguri_access');
		this.cookieService.delete('kanguri_refresh');
		this.store.dispatch(clearCurrentUser());
	}

	loadUserIfLoggedIn() {
		/**
		 * Checks if there is an access token in cookies
		 * and dispatches action to get currentUser's details
		 * from server and load them to the Store.
		 */
		if (this.cookieService.get('kanguri_access') !== null) {
			this.store.dispatch(getCurrentUserDetails());
		}
	}

}
