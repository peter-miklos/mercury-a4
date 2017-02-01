/* tslint:disable:no-unused-variable */
import { async, fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
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
  let person: {}

  beforeEach(async(() => {
    person: {
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
    de = fixture.debugElement;
    el = de.nativeElement;
    searchService = de.injector.get(SearchService);
    component = fixture.componentInstance;
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
  }))

  it("shows 'Submitting...' if the returning data by getPerson is in progress", () => {
    spyOn(searchService, 'getPerson').and.returnValue(Promise.resolve(undefined));
    component.loading = true;
    fixture.detectChanges();

    expect(el.querySelector('div#loading').innerText).toBe("Submitting...");
  })

});
