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
        this.listenForEnter();
    }

    private listenForEnter() {
        document.getElementById('search-control')
            .addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.search();
                }
            });
    }

    private watchSearchControl(): void {
        this.searchControl.valueChanges.pipe(
            debounceTime(150),
            distinctUntilChanged()
        ).subscribe(value => {
            if (value) {
                this.search();
            } else {
                this.showSearchResults = false;
            }
        });
    }

    public search(): void {
        this.showSearchResults = true;
        this.service.search(this.searchControl.value).subscribe(res => {
            this.searchResults = res.data;
        });
    }

}
