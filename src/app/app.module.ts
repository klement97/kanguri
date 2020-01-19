import {BrowserModule} from '@angular/platform-browser';
import {NgModule}      from '@angular/core';

import {AppComponent}                                         from './app.component';
import {BrowserAnimationsModule}                              from '@angular/platform-browser/animations';
import {AppRoutingModule}                                     from './app-routing.module';
import {HomeModule}                                           from './home/home.module';
import {RouterModule}                                         from '@angular/router';
import {ServiceWorkerModule}                                  from '@angular/service-worker';
import {environment}                                          from '../environments/environment';
import {AuthModule}                                           from './auth/auth.module';
import {StoreModule}                                          from '@ngrx/store';
import {metaReducers, reducers}                               from './reducers';
import {EffectsModule}                                        from '@ngrx/effects';
import {HTTP_INTERCEPTORS, HttpClientModule}                  from '@angular/common/http';
import {StoreDevtoolsModule}                                  from '@ngrx/store-devtools';
import {CookieService}                                        from 'ngx-cookie-service';
import {ErrorHandler}                                         from './common/error.handler';
import {ServiceInterceptor}                                   from './_interceptor/service.interceptor';
import {MatDialogModule}                                      from '@angular/material';
import {AuthService, AuthServiceConfig, GoogleLoginProvider,} from 'angular-6-social-login';

// Configs
export function getAuthServiceConfigs() {
	return new AuthServiceConfig(
		[
			// {
			//     id: FacebookLoginProvider.PROVIDER_ID,
			//     provider: new FacebookLoginProvider('Your-Facebook-app-id')
			// },
			{
				id      : GoogleLoginProvider.PROVIDER_ID,
				provider: new GoogleLoginProvider('827784296252-33ag9eu6eaajoijoaipvco11as3e5880.apps.googleusercontent.com')
			},
		]);
}


@NgModule({
	declarations: [
		AppComponent,
	],
	imports     : [
		BrowserModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		RouterModule,
		HttpClientModule,
		MatDialogModule,
		ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
		EffectsModule.forRoot([]),
		StoreModule.forRoot(reducers, {
			metaReducers,
			runtimeChecks: {
				strictStateImmutability : true,
				strictActionImmutability: true
			}
		}),
		StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),

		// apps
		AuthModule,
		HomeModule,

	],
	providers   : [
		CookieService,
		ErrorHandler,
		AuthService,
		{
			provide : HTTP_INTERCEPTORS,
			useClass: ServiceInterceptor,
			multi   : true
		},
		{
			provide   : AuthServiceConfig,
			useFactory: getAuthServiceConfigs
		}
	],
	bootstrap   : [AppComponent]
})
export class AppModule {
}
