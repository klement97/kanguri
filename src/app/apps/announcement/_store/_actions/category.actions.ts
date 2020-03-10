import {createAction, props} from '@ngrx/store';


import {ErrorResponse} from 'src/app/common/const';
import {Category} from 'src/app/apps/announcement/_store/_models/announcement.model';


export const loadCategories = createAction(
    '[Category] Load Categories'
);

export const loadCategoriesSuccess = createAction(
    '[Category/API] Load Categories Success',
    props<{ categories: Category[] }>()
);

export const loadCategoriesFailure = createAction(
    '[Category/API] Load Categories Failure',
    props<{ error: ErrorResponse }>()
);

export const addCategory = createAction(
    '[Category/API] Add Category',
    props<{ category: Category }>()
);

export const clearCategorys = createAction(
    '[Category/API] Clear Categorys'
);
