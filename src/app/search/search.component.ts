import { Component, OnInit }      from '@angular/core';

import { Person, SearchService }  from '../_services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  query: string;
  searchResults: Array<Person>;

  constructor(
    private searchService: SearchService
  ) { }

  ngOnInit() {
  }

  search(): void {
    this.searchService.getAll().then(
      data => { this.searchResults = data; },
      error => console.error(error)
    )
  }
}
