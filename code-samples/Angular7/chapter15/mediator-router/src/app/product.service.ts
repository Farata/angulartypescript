import {Observable, of} from 'rxjs';
import {Injectable} from '@angular/core';
import {delay} from 'rxjs/operators';
// import {_throw} from 'rxjs/observable/throw';
import {throwError} from 'rxjs';

@Injectable()
export class ProductService {
  static counter = 0;

  getProducts(searchQuery: string): Observable<string[]> {
    const productGenerator = () => `Product ${searchQuery}${ProductService.counter++}`;
    const products = Array.from({ length: 5 }, productGenerator);

    if (Math.random() < 0.7) {  // don't always return products successfully
      return of(products).pipe(delay(1000));
    } else {
      return throwError('Can not retrieve products');
    }
  }
}


