import {Action, createReducer, on} from '@ngrx/store';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import * as CategoryActions from 'src/app/apps/announcement/_store/_actions/category.actions';
import {ErrorResponse} from 'src/app/common/const';
import {Category} from 'src/app/apps/announcement/_store/_models/announcement.model';


export const categoriesFeatureKey = 'categories';


export interface State extends EntityState<Category> {
    error: ErrorResponse;
}


export const adapter: EntityAdapter<Category> = createEntityAdapter<Category>();

export const initialState: State = adapter.getInitialState({
    error: null
});

const categoryReducer = createReducer(
    initialState,
    on(CategoryActions.addCategory,
        (state, action) => adapter.addOne(action.category, state)
    ),
    on(CategoryActions.loadCategoriesSuccess,
        (state, {categories}) => adapter.addAll(categories, state)
    ),
    on(CategoryActions.loadCategoriesFailure,
        (state, {error}) => ({...state, error})
    ),
    on(CategoryActions.clearCategorys,
        state => adapter.removeAll(state)
    ),
);

export function reducer(state: State | undefined, action: Action) {
    return categoryReducer(state, action);
}

export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
} = adapter.getSelectors();
