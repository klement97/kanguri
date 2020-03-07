import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AnnouncementListComponent} from 'src/app/apps/announcement/_components/announcement-list/announcement-list.component';


const routes: Routes = [
  {path: 'list', component: AnnouncementListComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnnouncementRoutingModule {}
