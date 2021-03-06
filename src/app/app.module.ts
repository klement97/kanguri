import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {RouterModule} from '@angular/router';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {AuthModule} from './apps/auth/auth.module';
import {StoreModule} from '@ngrx/store';
import {metaReducers, reducers} from './reducers';
import {EffectsModule} from '@ngrx/effects';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {CookieService} from 'ngx-cookie-service';
import {MatDialogModule} from '@angular/material/dialog';
import {ServiceInterceptor} from 'src/app/_interceptor/service.interceptor';
import {HeaderComponent} from './layout/header/header.component';
import {MatButtonModule} from '@angular/material/button';
import {AnnouncementSearchComponent} from './layout/announcement-search/announcement-search.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';


const matModules: any[] = [
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
];


@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        AnnouncementSearchComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        RouterModule,
        HttpClientModule,
        ...matModules,
        ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
        EffectsModule.forRoot([]),
        StoreModule.forRoot(reducers, {
            metaReducers,
            runtimeChecks: {
                strictStateImmutability: true,
                strictActionImmutability: true
            }
        }),
        StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),

        // apps
        AuthModule,
        ReactiveFormsModule,
        MatSelectModule,

    ],
    providers: [
        CookieService,
        {provide: HTTP_INTERCEPTORS, useClass: ServiceInterceptor, multi: true}, // interceptor
    ],
    exports: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
