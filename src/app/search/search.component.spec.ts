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
  let searchService: SearchService;
  let searchServiceStub: {};
  let testPersons: {};
  let searchButton: HTMLElement;
  let showAllButton: HTMLElement;

  beforeEach(async(() => {
    searchServiceStub = {
      getAll: [
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
        }
      ],
      getPerson(id: number) { return { } },
      search(q: string) {}
    }
    TestBed.configureTestingModule({
      declarations: [ SearchComponent ],
      imports: [
        MaterialModule.forRoot(),
        FormsModule,
        HttpModule,
        RouterTestingModule
      ],
      providers: [ SearchService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    searchService = fixture.debugElement.injector.get(SearchService);
    searchButton = fixture.debugElement.nativeElement.querySelector('button#search');
    showAllButton = fixture.debugElement.nativeElement.querySelector('button#show-all');

    spyOn(searchService, 'getAll')
      .and.returnValue(Promise.resolve(searchServiceStub['getAll']));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('calls showAll() if button clicked', async(() => {
    spyOn(component, 'showAll');
    showAllButton.click();

    fixture.whenStable().then(() => {
      expect(component.showAll).toHaveBeenCalled();
    })
  }));

  it('should show persons after getAll promise (async)', async(() => {
    showAllButton.click();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.querySelector('a#name-1').innerText).toBe("Bob Smith");
      expect(fixture.debugElement.nativeElement.querySelector('h4#name-phone-1').textContent).toContain("843-555-1234");
      expect(fixture.debugElement.nativeElement.querySelector('p#ad-street-1').innerText).toBe("123 North Kings Highway");
      expect(fixture.debugElement.nativeElement.querySelector('p#ad-city-state-zip-1').innerText).toBe("Myrtle Beach, SC 29577");
    });
  }));
});
