import {createAction, props} from '@ngrx/store';
import {Update} from '@ngrx/entity';

import {Category} from 'src/app/apps/announcement/_store/_models/category.model';


export const loadCategorys = createAction(
    '[Category/API] Load Categorys',
    props<{ categorys: Category[] }>()
);

export const addCategory = createAction(
    '[Category/API] Add Category',
    props<{ category: Category }>()
);

export const upsertCategory = createAction(
    '[Category/API] Upsert Category',
    props<{ category: Category }>()
);

export const addCategorys = createAction(
    '[Category/API] Add Categorys',
    props<{ categorys: Category[] }>()
);

export const upsertCategorys = createAction(
    '[Category/API] Upsert Categorys',
    props<{ categorys: Category[] }>()
);

export const updateCategory = createAction(
    '[Category/API] Update Category',
    props<{ category: Update<Category> }>()
);

export const updateCategorys = createAction(
    '[Category/API] Update Categorys',
    props<{ categorys: Update<Category>[] }>()
);

export const deleteCategory = createAction(
    '[Category/API] Delete Category',
    props<{ id: string }>()
);

export const deleteCategorys = createAction(
    '[Category/API] Delete Categorys',
    props<{ ids: string[] }>()
);

export const clearCategorys = createAction(
    '[Category/API] Clear Categorys'
);
