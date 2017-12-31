import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/of';

export interface Product {
   id: number;
   title: string;
   price: number
}

@Injectable()
export class ProductService {

  products:Product[] = [
    { id:0, title: "First Product", price:24.99},
    { id:1, title:"Second Product", price:64.99},
    {id:2, title:"Third Product", price:74.99}
  ];

  getProducts(): Observable<Product[]> {

    return Observable.of(this.products);
  }
}

