import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/from';

export class Product {
  constructor( public id: number, public title: string, public price: number){}
}

@Injectable()
export class ProductService {

  products:Product[] = [
  new Product(0, "First Product", 24.99),
  new Product(1, "Second Product", 64.99),
  new Product(2, "Third Product", 74.99)
];

  getProducts(): Observable<any> {

    return Observable.from(this.products);
  }
}

