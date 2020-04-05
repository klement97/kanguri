import {FormControl} from '@angular/forms';


export class JwtModel {
    refresh: string;
    access: string;
}


export const KANGURI_ACCESS = '_kanguri_access';
export const KANGURI_REFRESH = '_kanguri_refresh';
export const KANGURI_USER = '_kanguri_user';
export const KANGURI_AUTHORIZATION = 'KanguriAuthorization';


export function buildQueryString(payload) {
    const queryString = [];
    if (payload.page !== undefined && payload.page !== null) {
        queryString.push(`page=${payload.page + 1}`);
    }
    if (payload.pageSize) {
        queryString.push(`page_size=${payload.pageSize}`);
    }
    if (payload.sort_field) {
        queryString.push(`sort_field=${payload.sort_field}`);
    }
    if (payload.sort) {
        queryString.push(`sort=${payload.sort}`);
    }
    if (payload.filter) {
        queryString.push(`filter=${JSON.stringify(payload.filter)}`);
    }
    if (queryString.length > 0) {
        return '?' + queryString.join('&');
    }
    return '';
}


export interface QueryParam {
    page: number;
    pageSize: number;
    sort_field?: string;
    sort?: 'asc' | 'desc';
    filter: object;
}


export function clientSideSearch(formControl: FormControl, list: any[], filterList: any[], searchField: string) {
    formControl.valueChanges.subscribe(
        (value: string) => {
            filterList = list.filter(item => item[searchField].toLowerCase().includes(value.toLowerCase()));
        }
    );
}


export class APIResponse {
    data: any;
    count: number;
}


export class ErrorResponse {
    type: string;
    errors: any;
    message: string;
}


export const CITIES = [
    {id: 1, name: 'Tirana'},
    {id: 2, name: 'Durrës'},
    {id: 3, name: 'Vlorë'},
    {id: 4, name: 'Elbasan'},
    {id: 5, name: 'Shkodër'},
    {id: 6, name: 'Fier'},
    {id: 7, name: 'Kamëz'},
    {id: 8, name: 'Korçë'},
    {id: 9, name: 'Berat'},
    {id: 10, name: 'Lushnjë'},
    {id: 11, name: 'Pogradec'},
    {id: 12, name: 'Kavajë'},
    {id: 13, name: 'Gjirokastër'},
    {id: 14, name: 'Fushë'},
    {id: 15, name: 'Sarandë'},
    {id: 16, name: 'Laç'},
    {id: 17, name: 'Kukës'},
    {id: 18, name: 'Sukth'},
    {id: 19, name: 'Patos'},
    {id: 20, name: 'Lezhë'},
    {id: 21, name: 'Mamurras'},
    {id: 22, name: 'Peshkopi'},
    {id: 23, name: 'Kuçovë'},
    {id: 24, name: 'Krujë'},
    {id: 25, name: 'Vorë'},
    {id: 26, name: 'Burrel'},
    {id: 27, name: 'Rrëshen'},
    {id: 28, name: 'Milot'},
    {id: 29, name: 'Divjakë'},
    {id: 30, name: 'Gramsh'},
    {id: 31, name: 'Bulqizë'},
    {id: 32, name: 'Vau'},
    {id: 33, name: 'Shëngjin'},
    {id: 34, name: 'Klos'},
    {id: 35, name: 'Ballsh'},
    {id: 36, name: 'Shijak'},
    {id: 37, name: 'Ura'},
    {id: 38, name: 'Rrogozhinë'},
    {id: 39, name: 'Librazhd'},
    {id: 40, name: 'Cërrik'},
    {id: 41, name: 'Manëz'},
    {id: 42, name: 'Peqin'},
    {id: 43, name: 'Bilisht'},
    {id: 44, name: 'Krumë'},
    {id: 45, name: 'Përmet'},
    {id: 46, name: 'Prrenjas'},
    {id: 47, name: 'Delvinë'},
    {id: 48, name: 'Orikum'},
    {id: 49, name: 'Bajram'},
    {id: 50, name: 'Roskovec'},
    {id: 51, name: 'Rubik'},
    {id: 52, name: 'Tepelenë'},
    {id: 53, name: 'Poliçan'},
    {id: 54, name: 'Maliq'},
    {id: 55, name: 'Çorovodë'},
    {id: 56, name: 'Ersekë'},
    {id: 57, name: 'Koplik'},
    {id: 58, name: 'Pukë'},
    {id: 59, name: 'Himarë'},
    {id: 60, name: 'Këlcyrë'},
    {id: 61, name: 'Memaliaj'},
    {id: 62, name: 'Fushë'},
    {id: 63, name: 'Bajzë'},
    {id: 64, name: 'Krrabë'},
    {id: 65, name: 'Selenicë'},
    {id: 66, name: 'Konispol'},
    {id: 67, name: 'Libohovë'},
    {id: 68, name: 'Reps'},
    {id: 69, name: 'Fierzë'},
    {id: 70, name: 'Krastë'},
    {id: 71, name: 'Leskovik'},
    {id: 72, name: 'Finiq'},
    {id: 73, name: 'Ulëz'},
    {id: 74, name: 'Kurbnesh'},
];
