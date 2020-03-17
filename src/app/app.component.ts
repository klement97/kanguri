import {Component} from '@angular/core';
import {CurrentUserService} from 'src/app/apps/auth/_store/_services/current-user.service';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'kanguri';

    constructor(private currentUserService: CurrentUserService) {
        currentUserService.loadUserIfLoggedIn();
    }
}
