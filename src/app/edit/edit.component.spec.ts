/* tslint:disable:no-unused-variable */
import { async, fakeAsync, ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';

import { EditComponent } from './edit.component';
import { SearchService } from '../_services/search.service';

describe('EditComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let searchService: SearchService;
  let saveButton: HTMLElement;
  let backButton: HTMLElement;
  let person: {};

  beforeEach(async(() => {
    person = {
      "id": 1,
      "name": "Bob Smith",
      "phone": "843-555-1234",
      "address": {
        "street": "123 North Kings Highway",
        "city": "Myrtle Beach",
        "state": "SC",
        "zip": "29577"
      }
    };
    TestBed.configureTestingModule({
      declarations: [ EditComponent ],
      imports: [
        MaterialModule.forRoot(), FormsModule,
        HttpModule, RouterTestingModule
      ],
      providers: [ SearchService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    el = de.nativeElement;
    searchService = de.injector.get(SearchService);
    saveButton = el.querySelector('button#save');
    backButton = el.querySelector('button#backToSearch');
  });

  it('should create', () => {
    spyOn(searchService, 'getPerson').and.returnValue(Promise.resolve(undefined));
    expect(component).toBeTruthy();
  });

  it('calls the searchService.getPerson method on init', () => {
    spyOn(searchService, 'getPerson').and.returnValue(Promise.resolve(undefined));
    component.ngOnInit();
    expect(searchService.getPerson).toHaveBeenCalled();
  })

  it('informs user if no person was found, undefined is returned by searchService', fakeAsync(() => {
    spyOn(searchService, 'getPerson').and.returnValue(Promise.resolve(undefined));
    component.ngOnInit();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(el.querySelector('div#no-person-found').innerText).toBe("No person found.");
    })
  }));

  it("show the person's details received from the searchService", async(() => {
    spyOn(searchService, 'getPerson').and.returnValue(Promise.resolve(person));
    component.ngOnInit();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(el.querySelector('input#name').getAttribute('ng-reflect-model')).toBe(person["name"]);
      expect(el.querySelector('input#phone').getAttribute('ng-reflect-model')).toBe(person["phone"]);
      expect(el.querySelector('input#street').getAttribute('ng-reflect-model')).toBe(person["address"]["street"]);
      expect(el.querySelector('input#city').getAttribute('ng-reflect-model')).toBe(person["address"]["city"]);
      expect(el.querySelector('input#state').getAttribute('ng-reflect-model')).toBe(person["address"]["state"]);
      expect(el.querySelector('input#zip').getAttribute('ng-reflect-model')).toBe(person["address"]["zip"]);
    })
  }))

  xit('calls the searchService.save function with person data if save button clicked', () => {

  });

  xit("sets loading var to true when save button clicked", () => {

  });

  xit("navigates to search screen after person data saved", () => {

  })

  it("shows 'Submitting...' if the returning data by getPerson is in progress", () => {
    spyOn(searchService, 'getPerson').and.returnValue(Promise.resolve(undefined));
    component.loading = true;
    fixture.detectChanges();

    expect(el.querySelector('div#loading').innerText).toBe("Submitting...");
  })

  xit("navigates to search view if 'Back to Search' button clicked", () => {

  })

});
