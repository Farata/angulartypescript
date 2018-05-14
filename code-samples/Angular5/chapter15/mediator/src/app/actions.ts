import { Action } from '@ngrx/store';

export const SEARCH = '[Product] search';
export const SEARCH_SUCCESS = '[Product] search success';

export class SearchAction implements Action {
  readonly type = SEARCH;

  constructor(public payload: { searchQuery: string }) {}
}

export class SearchSuccessAction implements Action {
  readonly type = SEARCH_SUCCESS;

  constructor(public payload: { searchResults: string[] }) {}
}

export type SearchActions = SearchAction | SearchSuccessAction;
