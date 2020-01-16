import {AfterViewInit, Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {LoginComponent} from '../../auth/login/login.component';
import {Observable} from 'rxjs';
import {UserModel} from '../../auth/_store/_models/user.model';
import {Store} from '@ngrx/store';
import * as fromCurrentUser from 'src/app/auth/_store/_reducers/current-user.reducer';
import {selectCurrentUser} from '../../auth/_store/_selectors/current-user.selectors';
import * as CurrentUserActions from 'src/app/auth/_store/_actions/current-user.actions';
import {CurrentUserService} from '../../auth/_store/_services/current-user.service';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.css', 'landing.mobile.component.css']
})
export class LandingComponent implements OnInit, AfterViewInit {
    currentUser: Observable<UserModel>;

    constructor(private dialog: MatDialog,
                private store: Store<fromCurrentUser.State>,
                private userService: CurrentUserService,
    ) {
        this.currentUser = store.select(selectCurrentUser);
    }

    ngOnInit() {
    }

    ngAfterViewInit(): void {
    }

    openLoginDialog() {
        const dialogRef = this.dialog.open(LoginComponent);
        dialogRef.afterClosed().subscribe(() => this.getCurrentUserDetails());
    }

    logout() {
        this.userService.logout();
    }

    getCurrentUserDetails() {
        this.store.dispatch(CurrentUserActions.getCurrentUserDetails());
    }


}
