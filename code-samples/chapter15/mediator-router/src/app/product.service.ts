import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {delay} from 'rxjs/operators';
import {_throw} from 'rxjs/observable/throw';
import 'rxjs/add/observable/of';

@Injectable()
export class ProductService {
  static counter = 0;

  getProducts(searchQuery: string): Observable<string[]> {
    const productGenerator = () => `Product ${searchQuery}${ProductService.counter++}`;
    const products = Array.from({ length: 5 }, productGenerator);

    if (Math.random() < 0.7) {  // don't always return products successfully
      return Observable.of(products).pipe(delay(1000));
    } else {
      return _throw('Can not retrieve products');
    }
  }
}


