/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { SearchService } from './search.service';

describe('SearchService', () => {
  let service: SearchService;
  let persons: [];

  beforeEach(() => {
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
      providers: [SearchService],
      imports: [HttpModule]
    });
    service = new SearchService();
  });

  it('should ...', inject([SearchService], (service: SearchService) => {
    expect(service).toBeTruthy();
  }));

  // describe('#getAll', () => {
  //
  // }));

  describe('#getPerson', () => {

    beforeEach(() => {
      // service = new SearchService();
      spyOn(service, 'getAll').and.returnValue(Promise.resolve(persons));
    });

    it('calls getAll function', () => {
      service.getPerson(1)
      expect(service.getAll).toHaveBeenCalled();
    });

    it('returns the details of the requested person', done => {
      service.getPerson(2).then(value => {
        expect(value).toBe(persons[1]);
        done();
      })
    })

    it('returns undefined if a non-existing id is used', done => {
      service.getPerson(22).then(value => {
        expect(value).toBe(undefined);
        done();
      })
    })
  });
});
