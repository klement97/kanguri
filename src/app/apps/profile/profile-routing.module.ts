import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserProfileComponent} from 'src/app/apps/profile/user-profile/user-profile.component';


const routes: Routes = [
	{path: 'user', component: UserProfileComponent, pathMatch: 'full'},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ProfileRoutingModule {}
