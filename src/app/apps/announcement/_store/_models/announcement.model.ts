import {Seller} from 'src/app/apps/auth/_store/_models/user.model';


export interface Announcement {
    id: number;
    name: string;
    price: string;
    description: string;
    views_count: number;
    sold: boolean;
    images: Image[];
    category: Category;
    seller: Seller;
    date_created: string;

    category_name: string;
    seller_name: string;
    is_favourite: boolean;
}


export interface Category {
    id: number;
    name: string;
    announcement_count: number;
}


export interface Image {
    id: number;
    image: string;
}


export interface AnnouncementMinMaxValues {
    min_price: number;
    max_price: number;
    min_date_created: string;
    max_date_created: string;
}

export interface View {
    user: number;
    announcement: number;
    country: string;
    country_code: string;
    region: string;
    region_name: string;
    city: string;
    ip_address: string;
    is_mobile: boolean;
}
