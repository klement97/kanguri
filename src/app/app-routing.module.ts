import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import { environment } from 'src/environments/environment';

const routes: Routes = [
    {path: '', loadChildren: () => import('./apps/home/home.module').then(m => m.HomeModule)},
    {path: 'profile', loadChildren: () => import('./apps/profile/profile.module').then(m => m.ProfileModule)},
    {path: '*', redirectTo: ''}
];


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forRoot(routes, {enableTracing: !environment.production})
    ]
})
export class AppRoutingModule {
}
