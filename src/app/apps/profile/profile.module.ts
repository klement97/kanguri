import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProfileRoutingModule} from 'src/app/apps/profile/profile-routing.module';
import {UserProfileComponent} from 'src/app/apps/profile/user-profile/user-profile.component';


@NgModule({
	declarations: [UserProfileComponent],
	imports: [
		CommonModule,
		ProfileRoutingModule
	]
})
export class ProfileModule {}
