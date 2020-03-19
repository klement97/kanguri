import {Component, OnInit} from '@angular/core';
import {AnnouncementSearchService} from 'src/app/layout/_services/announcement-search.service';
import {FormControl} from '@angular/forms';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';


@Component({
    selector: 'app-announcement-search',
    templateUrl: './announcement-search.component.html',
    styleUrls: ['./announcement-search.component.css']
})
export class AnnouncementSearchComponent implements OnInit {
    searchControl = new FormControl('');
    showSuggestions = false;
    suggestions: string[];


    constructor(private service: AnnouncementSearchService) {
    }

    ngOnInit(): void {
        this.searchControl.valueChanges.pipe(
                debounceTime(150),
                distinctUntilChanged()
        ).subscribe((value) => {
            // call service and fill suggestions here
        });
    }

}
