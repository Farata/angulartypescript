import { Action } from '@ngrx/store';
import { Product } from '../../../shared/services';


export enum ProductsActionTypes {
  Load = '[Products] Load All',
  Search = '[Products] Search',
  LoadFailure = '[Products] Load All Failure',
  LoadSuccess = '[Products] Load All Success',
  LoadProductsByCategory = '[Products] Load Products By Category',
}

export class LoadProducts implements Action {
  readonly type = ProductsActionTypes.Load;
}

export class LoadProductsByCategory implements Action {
  readonly type = ProductsActionTypes.LoadProductsByCategory;
  constructor(public readonly payload: { category: string }) {}
}

export class LoadProductsFailure implements Action {
  readonly type = ProductsActionTypes.LoadFailure;
  constructor(public readonly payload: { error: string }) {}
}

export class LoadProductsSuccess implements Action {
  readonly type = ProductsActionTypes.LoadSuccess;
  constructor(public readonly payload: { products: Product[] }) {}
}

export class SearchProducts implements Action {
  readonly type = ProductsActionTypes.Search;
  constructor(public readonly payload: { params: { [key: string]: any } }) {}
}

export type ProductsActions
  = LoadProducts
  | LoadProductsByCategory
  | LoadProductsFailure
  | LoadProductsSuccess
  | SearchProducts;
