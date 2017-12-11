import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

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
      map(products => <Product>products.find(p => p.id === productId)));
  }

  getByCategory(category: string): Observable<Product[]> {
    return this.http.get<Product[]>('/data/products.json').pipe(
      map(products => products.filter(p => p.categories.includes(category))));
  }

  getAllCategories(): Observable<string[]> {
    return this.http.get<Product[]>('/data/products.json')
      .pipe(
        map(this.reduceCategories),
        map(categories => Array.from(new Set(categories)))
      );
  }

  search(params: ProductSearchParams): Observable<Product[]> {
    return this.http.get<Product[]>('/data/products.json').pipe(
      map(products => this.filterProducts(products, params))
    );
  }

  private reduceCategories(products: Product[]): string[] {
    return products.reduce((all, product) => all.concat(product.categories), new Array<string>());
  }

  private filterProducts(products: Product[], params: ProductSearchParams): Product[] {
    return products
      .filter(p => params.title ? p.title.toLowerCase().includes((<string>params.title).toLowerCase()) : products)
      .filter(p => params.minPrice ? p.price >= params.minPrice : products)
      .filter(p => params.maxPrice ? p.price <= params.maxPrice : products);
  }
}
