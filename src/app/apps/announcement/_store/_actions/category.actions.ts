import {createAction, props} from '@ngrx/store';

import {Category} from 'src/app/apps/announcement/_store/_models/category.model';
import {ErrorResponse} from 'src/app/common/const';


export const loadCategories = createAction(
    '[Category] Load Categorys'
);

export const loadCategoriesSuccess = createAction(
    '[Category/API] Load Categories Success',
    props<{ categories: Category[] }>()
);

export const loadCategoriesFailure = createAction(
    '[Category/API] Load Categories Failre',
    props<{ error: ErrorResponse }>()
);

export const addCategory = createAction(
    '[Category/API] Add Category',
    props<{ category: Category }>()
);

export const clearCategorys = createAction(
    '[Category/API] Clear Categorys'
);
