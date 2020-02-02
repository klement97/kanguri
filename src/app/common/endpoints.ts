import {environment} from 'src/environments/environment';

const API_HOST = `${environment.apiHost}`;

const AUTH = `${API_HOST}/auth`;
const USERS = `${AUTH}/users`;
const CURRENT_USER = `${USERS}/me`;

const JWT = `${AUTH}/jwt`;
const JWT_CREATE = `${JWT}/create`;
const JWT_REFRESH = `${JWT}/refresh`;
const JWT_VERIFY = `${JWT}/verify`;

const ANNOUNCEMENT = `${API_HOST}/announcement`;

export const ENDPOINTS = {
    API_HOST,
    AUTH,
    USERS,
    CURRENT_USER,
    JWT_CREATE,
    JWT_REFRESH,
    JWT_VERIFY,
    ANNOUNCEMENT
};

export const NO_TOKEN_ENDPOINTS: string[] = [
    `${ENDPOINTS.JWT_CREATE}/`,
    `${ENDPOINTS.JWT_REFRESH}/`,
    `${ENDPOINTS.JWT_VERIFY}/`,
    `${ENDPOINTS.USERS}/`
];
