import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_BASE_URL } from '../../app.tokens';

export interface Product {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  description: string;
  categories: string[];
}

export interface ProductSearchParams {
  [key: string]: any; // To make compatible with HttpParams type.
  title?: string;
  minPrice?: number;
  maxPrice?: number;
}

export abstract class ProductService {
  abstract getAll(): Observable<Product[]>;
  abstract getById(productId: number): Observable<Product>;
  abstract getByCategory(category: string): Observable<Product[]>;
  abstract getAllCategories(): Observable<string[]>;
  abstract search(params: ProductSearchParams): Observable<Product[]>;
}

@Injectable()
export class HttpProductService implements ProductService {
  constructor(
    @Inject(API_BASE_URL) private baseUrl: string,
    private http: HttpClient
  ) {}

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/api/products`);
  }

  getById(productId: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/api/products/${productId}`);
  }

  getByCategory(category: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/api/categories/${category}`);
  }

  getAllCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/api/categories`);
  }

  search(params: ProductSearchParams): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/api/products`, { params });
  }
}

@Injectable()
export class _StaticProductService implements ProductService {
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
    return products.filter(p => {
      if (params.title && !p.title.toLowerCase().includes(params.title.toLowerCase())) {
        return false;
      }
      if (params.minPrice && p.price < params.minPrice) {
        return false;
      }
      if (params.maxPrice && p.price > params.maxPrice) {
        return false;
      }
      return true;
    });
  }
}
