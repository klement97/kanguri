import {Action, createReducer, on} from '@ngrx/store';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Category} from 'src/app/apps/announcement/_store/_models/category.model';
import * as CategoryActions from 'src/app/apps/announcement/_store/_actions/category.actions';


export const categoriesFeatureKey = 'categories';


export interface State extends EntityState<Category> {
  // additional entities state properties
}


export const adapter: EntityAdapter<Category> = createEntityAdapter<Category>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

const categoryReducer = createReducer(
    initialState,
    on(CategoryActions.addCategory,
        (state, action) => adapter.addOne(action.category, state)
    ),
    on(CategoryActions.upsertCategory,
        (state, action) => adapter.upsertOne(action.category, state)
    ),
    on(CategoryActions.addCategorys,
        (state, action) => adapter.addMany(action.categorys, state)
    ),
    on(CategoryActions.upsertCategorys,
        (state, action) => adapter.upsertMany(action.categorys, state)
    ),
    on(CategoryActions.updateCategory,
        (state, action) => adapter.updateOne(action.category, state)
    ),
    on(CategoryActions.updateCategorys,
        (state, action) => adapter.updateMany(action.categorys, state)
    ),
    on(CategoryActions.deleteCategory,
        (state, action) => adapter.removeOne(action.id, state)
    ),
    on(CategoryActions.deleteCategorys,
        (state, action) => adapter.removeMany(action.ids, state)
    ),
    on(CategoryActions.loadCategorys,
        (state, action) => adapter.addAll(action.categorys, state)
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
