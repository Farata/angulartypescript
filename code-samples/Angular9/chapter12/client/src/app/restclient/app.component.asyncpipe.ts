import { HttpClient} from '@angular/common/http';
import {Observable, EMPTY} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Component} from "@angular/core";

interface Product {
  id: number,
  title: string,
  price: number
}

@Component({
  selector: 'app-root',
  template: `<h1>All Products</h1>
  <ul>
    <li *ngFor="let product of products$ | async">
      {{product.title }} {{product.price | currency}}
    </li>
  </ul>
  {{error}}
  `})
export class AppComponentAsync{

  products$: Observable<Product[]>;
  error:string;
  constructor(private httpClient: HttpClient) {
    this.products$ = this.httpClient.get<Product[]>('/api/products')
      .pipe(
        catchError( err => {
          this.error = `Can't get products. Got ${err.status} from ${err.url}`;
          return EMPTY;     // empty observable
        })
      );
  }
}
