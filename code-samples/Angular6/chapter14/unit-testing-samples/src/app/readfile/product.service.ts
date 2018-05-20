import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from './product';

@Injectable()
export class ProductService {

  constructor(private httpClient: HttpClient ) {}

  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>('/data/products.json');
  }
}
