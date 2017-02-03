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
  //   beforeEach(() => {
  //     spyOn(httpModule, 'get').and.returnValue(Promise.resolve(persons));
  //   })
  //
  //   it('trial', done => {
  //     service.getAll().then(value => {
  //       expect(value).toBe(persons);
  //       done();
  //     })
  //   })
  //
  //   xit('calls http.get method with a link', done => {
  //
  //   })
  // });

  describe('#getPerson', () => {

    beforeEach(() => {
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

  describe('#search', () => {

    beforeEach(() => {
      spyOn(service, 'getAll').and.returnValue(Promise.resolve(persons));
    });

    it('returns all persons if no value is used in search', done => {
      service.search('').then(value => {
        expect(value.length).toBe(2);
        expect(value[0]).toBe(persons[0]);
        expect(value[1]).toBe(persons[1]);
        done();
      })
    })

    it('returns all persons if a * is used in search', done => {
      service.search('*').then(value => {
        expect(value.length).toBe(2);
        expect(value[0]).toBe(persons[0]);
        expect(value[1]).toBe(persons[1]);
        done();
      })
    })

    it('finds and returns one person if first name is searched', done => {
      service.search('jim').then(value => {
        expect(value.length).toBe(1);
        expect(value[0]).toBe(persons[1]);
        done();
      })
    })

    it('finds and returns both people if city is searched (same city included)', done => {
      service.search('Myrtle Beach').then(value => {
        expect(value.length).toBe(2);
        expect(value[0]).toBe(persons[0]);
        expect(value[1]).toBe(persons[1]);
        done();
      })
    })

    it('is not case sensitive', done => {
      service.search('bOb sMiT').then(value => {
        expect(value.length).toBe(1);
        expect(value[0]).toBe(persons[0]);
        done();
      })
    })
  });

  describe('#save', () => {

  })
});
