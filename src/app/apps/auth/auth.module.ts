import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from 'src/app/apps/auth/login/login.component';
import {EffectsModule} from '@ngrx/effects';
import {CurrentUserEffects} from 'src/app/apps/auth/_store/_effects/current-user.effects';
import {StoreModule} from '@ngrx/store';
import * as fromCurrentUser from 'src/app/apps/auth/_store/_reducers/current-user.reducer';
import {AuthRoutingModule} from 'src/app/apps/auth/auth-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {SignupComponent} from 'src/app/apps/auth/signup/signup.component';


@NgModule({
	declarations: [LoginComponent, SignupComponent],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		EffectsModule.forFeature([CurrentUserEffects]),
		StoreModule.forFeature(fromCurrentUser.currentUserFeatureKey, fromCurrentUser.reducer),
		AuthRoutingModule,
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule
	],
	entryComponents: [LoginComponent],
})
export class AuthModule {
}
