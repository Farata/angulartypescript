import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ProductService {

  constructor(private http: HttpClient) {}

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>('/data/products/all.json');
  }

  getCategory(category: string): Observable<Product[]> {
    return this.http.get<Product[]>(`/data/products/${category}.json`);
  }

  getProductById(productId: string): Observable<Product> {
    return this.http.get<Product[]>('/data/products/all.json')
      .map(products => products.find(p => p.id === productId));
  }
}

export interface Product {
  description: string;
  featured: boolean;
  imageUrl: string;
  price: number;
  title: string;
  id: string;
}
