import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromCurrentUser from 'src/app/apps/auth/_store/_reducers/current-user.reducer';
import {Observable} from 'rxjs';
import {UserModel} from 'src/app/apps/auth/_store/_models/user.model';
import {LoginComponent} from 'src/app/apps/auth/_components/login/login.component';
import * as CurrentUserActions from 'src/app/apps/auth/_store/_actions/current-user.actions';
import {DialogPosition, MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {CurrentUserService} from 'src/app/apps/auth/_store/_services/current-user.service';
import {selectCurrentUser} from 'src/app/apps/auth/_store/_selectors/current-user.selectors';
import {AuthService} from 'angularx-social-login';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    currentUser$: Observable<UserModel>;

    constructor(
        private dialog: MatDialog,
        private store: Store<fromCurrentUser.State>,
        private userService: CurrentUserService,
        private authService: AuthService
    ) {
        this.currentUser$ = store.select(selectCurrentUser);
    }

    ngOnInit() {
        this.authService.readyState.subscribe(r => {
            console.log('Ready State', r);
        });

        this.authService.authState.subscribe((r => {
            console.log('Auth State', r);
            if (r.authToken) {
                this.store.dispatch(CurrentUserActions.socialLogin({authToken: r.authToken}));
            }
        }));
    }

    openLoginDialog() {
        const position: DialogPosition = {top: '10px', right: '10px'};
        const config: MatDialogConfig = {
            position,
            minWidth: '30%',
            minHeight: '300px',
            hasBackdrop: false,
        };
        const dialogRef = this.dialog.open(LoginComponent, config);
        dialogRef.afterClosed().subscribe(() => this.getCurrentUserDetails());
    }

    logout() {
        this.authService.signOut(true).then();
        this.userService.logout();
    }

    getCurrentUserDetails() {this.store.dispatch(CurrentUserActions.getCurrentUserDetails()); }

}
