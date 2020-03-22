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
const CATEGORY = `${API_HOST}/category`;
const ANNOUNCEMENT_MIN_MAX_VALUES = `${API_HOST}/announcement_min_max_values`;
const IP_API = 'http://ip-api.com/json/?fields=status,message,country,countryCode,region,regionName,city,mobile,query';
const NEW_VIEW = `${API_HOST}/view`;

export const ENDPOINTS = {
    API_HOST,
    AUTH,
    USERS,
    CURRENT_USER,
    JWT_CREATE,
    JWT_REFRESH,
    JWT_VERIFY,
    ANNOUNCEMENT,
    CATEGORY,
    ANNOUNCEMENT_MIN_MAX_VALUES,
    IP_API,
    NEW_VIEW
};
