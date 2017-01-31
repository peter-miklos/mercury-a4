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
  let searchService: SearchService;
  let saveButton: HTMLElement;
  let backButton: HTMLElement;

  beforeEach(async(() => {
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
    searchService = fixture.debugElement.injector.get(SearchService);
    component = fixture.componentInstance;
    saveButton = fixture.debugElement.nativeElement.querySelector('button#save');
    backButton = fixture.debugElement.nativeElement.querySelector('button#backToSearch');
  });

  it('should create', () => {
    spyOn(searchService, 'getPerson').and.returnValue(Promise.resolve(undefined));
    expect(component).toBeTruthy();
  });

  it('informs user if no person was found, undefined is returned by searchService', fakeAsync(() => {
    spyOn(searchService, 'getPerson').and.returnValue(Promise.resolve(undefined));
    component.ngOnInit();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.querySelector('div#no-person-found').innerText).toBe("No person found.");
    })
  }))
});
