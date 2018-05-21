import { Action } from '@ngrx/store';


export enum SearchActionTypes {
  Search = '[Search] Search'
}

export class Search implements Action {
  readonly type = SearchActionTypes.Search;

  constructor(public readonly payload: {
    params: { [key: string]: any }
  }) {
  }
}

export type SearchActions = Search;
