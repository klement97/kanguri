import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AnnouncementRoutingModule} from './announcement-routing.module';
import {AnnouncementListComponent} from './announcement-list/announcement-list.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatPaginatorModule} from '@angular/material/paginator';


@NgModule({
  declarations: [AnnouncementListComponent],
    imports: [
        CommonModule,
        AnnouncementRoutingModule,
        MatCardModule,
        MatButtonModule,
        MatPaginatorModule
    ]
})
export class AnnouncementModule {}
