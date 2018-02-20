import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';

@Injectable()
export class ProductService {
  static counter = 0;

  generate(searchQuery: string): Observable<string[]> {
    const generator = () => `Product ${searchQuery}, price ${ProductService.counter++}`;
    const results = Array.from({ length: 5 }, generator);
    return Observable.of(results).delay(500);
  }
}
