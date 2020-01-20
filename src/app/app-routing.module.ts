import {NgModule}             from '@angular/core';
import {CommonModule}         from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
	{path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule)},
	{path: 'profile', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)},
	{path: '*', redirectTo: ''}
];


@NgModule({
	declarations: [],
	imports     : [
		CommonModule,
		RouterModule.forRoot(routes)
	]
})
export class AppRoutingModule {
}
