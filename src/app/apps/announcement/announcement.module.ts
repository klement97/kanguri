import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AnnouncementRoutingModule} from './announcement-routing.module';
import {AnnouncementListComponent} from './_components/announcement-list/announcement-list.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatPaginatorModule} from '@angular/material/paginator';
import {StoreModule} from '@ngrx/store';
import * as fromAnnouncement from 'src/app/apps/announcement/_store/_reducers/announcement.reducer';
import * as fromCategory from 'src/app/apps/announcement/_store/_reducers/category.reducer';
import {EffectsModule} from '@ngrx/effects';
import {AnnouncementEffects} from 'src/app/apps/announcement/_store/_effects/announcement.effects';
import {AnnouncementService} from 'src/app/apps/announcement/_store/_services/announcement.service';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSliderModule} from '@angular/material/slider';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';
import {CategoryEffects} from 'src/app/apps/announcement/_store/_effects/category.effects';
import {AnnouncementDetailComponent} from './_components/announcement-detail/announcement-detail.component';
import {MatSidenavModule} from '@angular/material/sidenav';


@NgModule({
    declarations: [AnnouncementListComponent, AnnouncementDetailComponent],
    imports: [
        CommonModule,
        AnnouncementRoutingModule,
        StoreModule.forFeature(fromAnnouncement.announcementsFeatureKey, fromAnnouncement.reducer),
        StoreModule.forFeature(fromCategory.categoriesFeatureKey, fromCategory.reducer),
        EffectsModule.forFeature([AnnouncementEffects, CategoryEffects]),
        MatCardModule,
        MatButtonModule,
        MatPaginatorModule,
        MatProgressBarModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSliderModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatIconModule,
        MatSidenavModule
    ],
    providers: [AnnouncementService]
})
export class AnnouncementModule {}
