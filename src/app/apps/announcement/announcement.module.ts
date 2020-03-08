import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AnnouncementRoutingModule} from './announcement-routing.module';
import {AnnouncementListComponent} from './_components/announcement-list/announcement-list.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatPaginatorModule} from '@angular/material/paginator';
import {StoreModule} from '@ngrx/store';
import * as fromAnnouncement from './_store/announcement.reducer';
import {EffectsModule} from '@ngrx/effects';
import {AnnouncementEffects} from 'src/app/apps/announcement/_store/announcement.effects';
import {AnnouncementService} from 'src/app/apps/announcement/_store/announcement.service';
import {MatProgressBarModule} from '@angular/material/progress-bar';


@NgModule({
    declarations: [AnnouncementListComponent],
    imports: [
        CommonModule,
        AnnouncementRoutingModule,
        StoreModule.forFeature(fromAnnouncement.announcementsFeatureKey, fromAnnouncement.reducer),
        EffectsModule.forFeature([AnnouncementEffects]),
        MatCardModule,
        MatButtonModule,
        MatPaginatorModule,
        MatProgressBarModule
    ],
    providers: [AnnouncementService]
})
export class AnnouncementModule {}
