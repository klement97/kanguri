import {JWT_CREATE_URL, JWT_REFRESH_URL, JWT_VERIFY_URL, USERS_URL} from '../auth/_store/_services/current-user.service';

export class JwtModel {
	refresh: string;
	access: string;
}

export const noCredentialsUrls: string[] = [
	`${JWT_CREATE_URL}/`,
	`${JWT_REFRESH_URL}/`,
	`${JWT_VERIFY_URL}/`,
	`${USERS_URL}/`
];
