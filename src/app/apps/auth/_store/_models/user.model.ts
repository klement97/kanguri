export class UserModel {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    image: any;
    password: string;
    is_active: boolean;
    is_superuser: boolean;
    phone: string;
    address_line: string;
    city: number;
}


export interface Seller {
    id: number;
    user: UserModel;
}
