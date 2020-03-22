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
    showSearchResults = false;
    searchResults: string[];


    constructor(
        private service: AnnouncementSearchService
    ) {
    }

    ngOnInit(): void {
        this.watchSearchControl();
    }

    watchSearchControl(): void {
        this.searchControl.valueChanges.pipe(
            debounceTime(150),
            distinctUntilChanged()
        ).subscribe(value => {
            if (value) {
                this.showSearchResults = true;
                this.service.search(value).subscribe(res => {
                    this.searchResults = res.data;
                    console.log(res.data);
                });
            } else {
                this.showSearchResults = false;
            }
        });
    }

}
