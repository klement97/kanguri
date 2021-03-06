import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {LandingComponent} from 'src/app/apps/home/landing/landing.component';


const routes: Routes = [
    {path: '', component: LandingComponent, pathMatch: 'full'}
];


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class HomeRoutingModule {
}
