import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {EffectsModule} from '@ngrx/effects';
import {CurrentUserEffects} from './_store/_effects/current-user.effects';
import {StoreModule} from '@ngrx/store';
import * as fromCurrentUser from 'src/app/auth/_store/_reducers/current-user.reducer';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    EffectsModule.forFeature([CurrentUserEffects]),
    StoreModule.forFeature(fromCurrentUser.currentUserFeatureKey, fromCurrentUser.reducer)
  ]
})
export class AuthModule {
}
