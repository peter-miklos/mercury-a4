import { Component, OnInit }      from '@angular/core';

import { Person, SearchService }  from '../_services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  search(): void {

  }
}
