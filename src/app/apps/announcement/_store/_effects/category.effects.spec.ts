import {TestBed} from '@angular/core/testing';
import {provideMockActions} from '@ngrx/effects/testing';
import {Observable} from 'rxjs';

import {CategoryEffects} from 'src/app/apps/announcement/_store/_effects/category.effects';


describe('CategoryEffects', () => {
    let actions$: Observable<any>;
    let effects: CategoryEffects;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                CategoryEffects,
                provideMockActions(() => actions$)
            ]
        });

        effects = TestBed.get<CategoryEffects>(CategoryEffects);
    });

    it('should be created', () => {
        expect(effects).toBeTruthy();
    });
});
