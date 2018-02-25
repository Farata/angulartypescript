import { Action } from '@ngrx/store';

export enum CategoriesActionTypes {
  Load = '[Categories] Load',
  LoadSuccess = '[Categories] Load Success'
}

export class LoadCategories implements Action {
  readonly type = CategoriesActionTypes.Load;
}

export class LoadCategoriesSuccess implements Action {
  readonly type = CategoriesActionTypes.LoadSuccess;
  constructor(public readonly payload: { categories: string[] }) {}
}

export type CategoriesActions
  = LoadCategories
  | LoadCategoriesSuccess;
