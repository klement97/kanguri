import {AfterViewInit, Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {LoginComponent} from '../../auth/login/login.component';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.css', 'landing.mobile.component.css']
})
export class LandingComponent implements OnInit, AfterViewInit {

    constructor(private dialog: MatDialog) {
    }

    ngOnInit() {
    }

    ngAfterViewInit(): void {
    }

    openLoginDialog() {
        const dialogRef = this.dialog.open(LoginComponent);
        dialogRef.afterClosed().subscribe(
            result => console.log('result from login', result)
        );
    }


}
