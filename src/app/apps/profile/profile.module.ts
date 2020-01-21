import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProfileRoutingModule} from 'src/app/apps/profile/profile-routing.module';
import {UserProfileComponent} from 'src/app/apps/profile/user-profile/user-profile.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
	declarations: [UserProfileComponent],
	imports: [
		CommonModule,
		ProfileRoutingModule,
		MatFormFieldModule,
		ReactiveFormsModule,
		MatSelectModule,
		MatInputModule,
		MatButtonModule,
		MatIconModule,
	]
})
export class ProfileModule {}
