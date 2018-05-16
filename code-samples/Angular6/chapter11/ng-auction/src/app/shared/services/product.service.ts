import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

export interface Product {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  description: string;
  categories: string[];
}

export interface ProductSearchParams {
  title?: string;
  minPrice?: number;
  maxPrice?: number;
}

@Injectable()
export class ProductService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>('/data/products.json');
  }

  getById(productId: number): Observable<Product> {
    return this.http.get<Product[]>('/data/products.json').pipe(
      map(products => products.find(p => p.id === productId)));
  }

  getByCategory(category: string): Observable<Product[]> {
    return this.http.get<Product[]>('/data/products.json').pipe(
      map(products => products.filter(p => p.categories.includes(category))));
  }

/**
 *  Return distinct category names
 *  First select all categories and then create a set with unique category names
 *  We use the lettable tap() operator to illustrate debugging of observable
 *
 *  See https://github.com/ReactiveX/rxjs/blob/master/doc/lettable-operators.md
 */
  getDistinctCategories(): Observable<string[]> {
    return this.http.get<Product[]>('/data/products.json')
      .pipe(
        tap(value => console.log('Before reducing categories', JSON.stringify(value[0]['categories']))),
        map(this.reduceCategories),
        tap(value => console.log(`After reducing categories ${value}`)),
        map(categories => Array.from(new Set(categories))),
        tap(value => console.log(`After creating categories array ${value}`))
      );
  }

  search(params: ProductSearchParams): Observable<Product[]> {
    return this.http.get<Product[]>('/data/products.json').pipe(
      map(products => this.filterProducts(products, params))
    );
  }

  // Populate an array with categories values of each product
  private reduceCategories(products: Product[]): string[] {
    return products.reduce((all, product) => all.concat(product.categories), new Array<string>());
  }

  // Keep only those product that meet the criteria from search params
  private filterProducts(products: Product[], params: ProductSearchParams): Product[] {
    return products
      .filter(p => params.title ? p.title.toLowerCase().includes((<string>params.title).toLowerCase()) : products)
      .filter(p => params.minPrice ? p.price >= params.minPrice : products)
      .filter(p => params.maxPrice ? p.price <= params.maxPrice : products);
  }
}
