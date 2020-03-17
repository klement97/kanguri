import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';


const routes: Routes = [
    {path: '', loadChildren: () => import('./apps/home/home.module').then(m => m.HomeModule)},
    {path: 'profile', loadChildren: () => import('./apps/profile/profile.module').then(m => m.ProfileModule)},
    {path: 'announcement', loadChildren: () => import('./apps/announcement/announcement.module').then(m => m.AnnouncementModule)},
    {path: '*', redirectTo: ''}
];


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forRoot(routes)
    ]
})
export class AppRoutingModule {
}
