import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class SearchService {

  constructor(private http: Http) { }

  getAll(): Promise<any> {
    return this.http.get('app/shared/search/data/people.json')
               .toPromise()
               .then((res: Response) => {
                 return this.addPersonsToSession(res.json());
               })
               .catch(this.handleError)
  }

  getPerson(id: number) {
    return this.getAll().then(data => {
      return data.find(p => p.id === id)
    });
  }

  search(q: string) {
    if(!q || q === "*") {
      q = '';
    } else {
      q = q.toLowerCase();
    }
    return this.getAll().then(data => {
      let results: any[] = [];
      data.map(item => {
        if (JSON.stringify(item).toLowerCase().includes(q)) {
          results.push(item);
        }
      });
      return results;
    });
  }

  save(person: any = {}): void {
    let persons = JSON.parse(sessionStorage.getItem('persons'));
    let index = persons.findIndex(p => p.id === person.id)
    if (index != -1) {
      persons.splice(index, 1);
      persons.push(person);
      sessionStorage.setItem('persons', JSON.stringify(persons));
    }
  }

  private addPersonsToSession(data: any) {
    data = data.sort((a, b) => a.name - b.name);
    sessionStorage.getItem('persons') ? sessionStorage.getItem('persons')
          : sessionStorage.setItem('persons', JSON.stringify(data));
    return JSON.parse(sessionStorage.getItem('persons'));
  }

  private handleError(error: any): Promise<any> {
    console.error("An error occured", error);
    return Promise.reject(error.message || error);
  }
}

export class Person {
  id: number;
  name: string;
  phone: string;
  address: Address;

  constructor(obj?: any) {
    this.id = obj && Number(obj.id) || null;
    this.name = obj && obj.name || '';
    this.phone = obj && obj.phone || '';
    this.address = obj && obj.address || '';
  }
}

export class Address {
  street: string;
  city: string;
  state: string;
  zip: string;

  constructor(obj?: any) {
    this.street = obj && obj.street || '';
    this.city = obj && obj.city || '';
    this.state = obj && obj.state || '';
    this.zip = obj && obj.zip || '';
  }
}
