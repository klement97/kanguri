import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {CategoryService} from 'src/app/apps/announcement/_store/_services/category.service';
import {
    loadCategories,
    loadCategoriesFailure,
    loadCategoriesSuccess
} from 'src/app/apps/announcement/_store/_actions/category.actions';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';


@Injectable()
export class CategoryEffects {


    loadCategories$ = createEffect(() => this.actions$.pipe(
        ofType(loadCategories),
        switchMap(() => this.service.getCategories().pipe(
            map(res => loadCategoriesSuccess({categories: res.data})),
            catchError(err => of(loadCategoriesFailure({error: err.error})))
        ))
    ));

    constructor(private actions$: Actions, private service: CategoryService) {
    }

}
