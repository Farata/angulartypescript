import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { Product, ProductService } from '../../../shared/services';
import {
  LoadProductsByCategory,
  LoadProductsFailure,
  LoadProductsSuccess,
  ProductsActionTypes,
  SearchProducts
} from '../actions';


@Injectable()
export class ProductsEffects {

  constructor(
    private readonly actions$: Actions,
    private readonly productService: ProductService) {}

  @Effect()
  loadProducts$: Observable<Action> = this.actions$
    .pipe(
      ofType(ProductsActionTypes.Load),
      switchMap(() => this.productService.getAll()),
      handleLoadedProducts()
    );

  @Effect()
  loadProducts1$: Observable<Action> = this.actions$
    .pipe(
      ofType(ProductsActionTypes.Load),
      switchMap(() => this.productService.getAll()),
      handleLoadedProducts()
    );

  @Effect()
  loadByCategory$: Observable<Action> = this.actions$
    .pipe(
      ofType<LoadProductsByCategory>(ProductsActionTypes.LoadProductsByCategory),
      map(action => action.payload.category),
      switchMap(category => this.productService.getByCategory(category)),
      handleLoadedProducts()
    );

  @Effect()
  searchProducts$: Observable<Action> = this.actions$
    .pipe(
      ofType(ProductsActionTypes.Search),
      map((action: SearchProducts) => action.payload.params),
      switchMap(params => this.productService.search(params)),
      handleLoadedProducts()
    );
}

const handleLoadedProducts = () =>
  (source: Observable<Product[]>) => source.pipe(
    map(products => new LoadProductsSuccess({ products })),
    catchError(error => of(new LoadProductsFailure({ error })))
  );
