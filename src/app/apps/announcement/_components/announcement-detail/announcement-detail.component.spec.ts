import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AnnouncementDetailComponent} from './announcement-detail.component';
import {Store, StoreModule} from '@ngrx/store';


describe('AnnouncementDetailComponent', () => {
  let component: AnnouncementDetailComponent;
  let fixture: ComponentFixture<AnnouncementDetailComponent>;
  let store: Store<any>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      declarations: [AnnouncementDetailComponent]
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnouncementDetailComponent);
    component = fixture.componentInstance;
    store = TestBed.get<Store>(Store);

    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
