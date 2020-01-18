import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {EffectsModule} from '@ngrx/effects';
import {CurrentUserEffects} from './_store/_effects/current-user.effects';
import {StoreModule} from '@ngrx/store';
import * as fromCurrentUser from 'src/app/auth/_store/_reducers/current-user.reducer';
import {AuthRoutingModule} from './auth-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import {CurrentUserService} from './_store/_services/current-user.service';
import {SignupComponent} from './signup/signup.component';


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
	entryComponents: [LoginComponent]
})
export class AuthModule {
	constructor(private currentUserService: CurrentUserService) {
		currentUserService.loadUserIfLoggedIn();
	}
}
