import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';

const API_HOST = `${environment.apiHost}`;

const AUTH_URL = `${API_HOST}/auth`;
const USERS_URL = `${AUTH_URL}/users`;
const CURRENT_USER_URL = `${USERS_URL}/me`;

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {

  constructor(private http: HttpClient) {
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
}
