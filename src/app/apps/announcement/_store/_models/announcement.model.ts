import {Seller} from 'src/app/apps/auth/_store/_models/user.model';


export interface Announcement {
    id: number;
    name: string;
    price: string;
    description: string;
    sold: boolean;
    images: Image[];
    category: Category;
    seller: Seller;
    date_created: string;

    category_name: string;
    seller_name: string;
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
