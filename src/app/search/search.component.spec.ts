/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';

import { SearchComponent } from './search.component';
import { SearchService } from '../_services/search.service';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let searchService: SearchService;
  let persons: [];
  let searchButton: HTMLElement;
  let showAllButton: HTMLElement;
  let queryField: HTMLElement;

  beforeEach(async(() => {
    persons = [
      {
        "id": 1,
        "name": "Bob Smith",
        "phone": "843-555-1234",
        "address": {
          "street": "123 North Kings Highway",
          "city": "Myrtle Beach",
          "state": "SC",
          "zip": "29577"
        }
      },
      {
        "id": 2,
        "name": "Jim Smith",
        "phone": "843-555-2345",
        "address": {
          "street": "321 North Kings Highway",
          "city": "Myrtle Beach",
          "state": "SC",
          "zip": "29577"
        }
      }
    ];
    TestBed.configureTestingModule({
      declarations: [ SearchComponent ],
      imports: [
        MaterialModule.forRoot(), FormsModule,
        HttpModule, RouterTestingModule
      ],
      providers: [ SearchService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    el = de.nativeElement;
    searchService = de.injector.get(SearchService);
    searchButton = el.querySelector('button#search');
    showAllButton = el.querySelector('button#show-all');
    queryField = de.query(By.css('input#query')).nativeElement;
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('calls searchService.getAll() if button clicked', async(() => {
    spyOn(searchService, 'getAll').and.returnValue(Promise.resolve([]));
    showAllButton.click();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(searchService.getAll).toHaveBeenCalled();
    })
  }));

  xit('shows persons after getAll promise (async)', async(() => {
    spyOn(searchService, 'getAll')
      .and.returnValue(Promise.resolve(persons));
    showAllButton.click();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(el.querySelector('a#name-1').innerText).toBe("Bob Smith");
      expect(el.querySelector('h4#name-phone-1').textContent).toContain("843-555-1234");
      expect(el.querySelector('p#ad-street-1').innerText).toBe("123 North Kings Highway");
      expect(el.querySelector('p#ad-city-state-zip-1').innerText).toBe("Myrtle Beach, SC 29577");
      expect(el.querySelector('a#name-2').innerText).toBe("Jim Smith");
      expect(el.querySelector('h4#name-phone-2').textContent).toContain("843-555-2345");
      expect(el.querySelector('p#ad-street-2').innerText).toBe("321 North Kings Highway");
      expect(el.querySelector('p#ad-city-state-zip-2').innerText).toBe("Myrtle Beach, SC 29577");
    });
  }));

  xit("console logs the error if searchService.getAll() returns error", async(() => {
    spyOn(searchService, 'getAll').and.throwError("Error message");
    fixture.detectChanges();

    expect(() => { component.showAll() }).toThrowError("Error message");
  }))

  xit("calls the search method in search.services with query value", async(() => {
    spyOn(searchService, 'search').and.returnValue(Promise.resolve([]));;
    queryField.value = "Robert";
    queryField.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    searchButton.click();
    fixture.detectChanges();

    expect(searchService.search).toHaveBeenCalled();
  }))

  xit("informs user if nothing is found, and empty array received from search.service", async(() => {
    spyOn(searchService, 'search').and.returnValue(Promise.resolve([]));
    queryField.value = "Robert";
    queryField.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    searchButton.click();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(el.querySelector('div#no-result').innerText).toBe("No results found");
    })
  }))

  it("console logs the error if searchService.search() returns error", async(() => {
    spyOn(searchService, 'search').and.throwError("Error message 2");
    fixture.detectChanges();

    expect(() => { component.search() }).toThrowError("Error message 2");
  }))
});
