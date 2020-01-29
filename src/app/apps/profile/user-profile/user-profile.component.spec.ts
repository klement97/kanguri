import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UserProfileComponent} from 'src/app/apps/profile/user-profile/user-profile.component';
import {Store, StoreModule} from '@ngrx/store';

describe('UserProfileComponent', () => {
    let component: UserProfileComponent;
    let fixture: ComponentFixture<UserProfileComponent>;
    let store: Store<any>;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            imports: [StoreModule.forRoot({})],
            declarations: [UserProfileComponent]
        });

        await TestBed.compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(UserProfileComponent);
        component = fixture.componentInstance;
        store = TestBed.get<Store<any>>(Store);

        spyOn(store, 'dispatch').and.callThrough();
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
