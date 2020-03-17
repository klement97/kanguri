import * as fromCategory from '../_reducers/category.reducer';
import {createFeatureSelector, createSelector} from '@ngrx/store';


export const selectCategoryState = createFeatureSelector<fromCategory.State>(fromCategory.categoriesFeatureKey);

export const selectCategories = createSelector(
    selectCategoryState,
    fromCategory.selectAll
);

export const selectCategoriesCount = createSelector(
    selectCategoryState,
    fromCategory.selectTotal
);
