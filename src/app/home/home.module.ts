import {NgModule}          from '@angular/core';
import {CommonModule}      from '@angular/common';
import {LandingComponent}  from './landing/landing.component';
import {HomeRoutingModule} from './home-routing.module';
import {MatButtonModule}   from '@angular/material';


@NgModule({
	declarations: [LandingComponent],
	imports     : [
		CommonModule,
		HomeRoutingModule,
		MatButtonModule
	],
	exports     : [LandingComponent]
})
export class HomeModule {
}
