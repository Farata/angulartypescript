import { Action } from '@ngrx/store';

export enum SearchActionTypes {
   Search = '[Product] search',
   SearchSuccess = '[Product] search success',
   SearchFailure = '[Product] search failure'
}

export class SearchAction implements Action {
  readonly type = SearchActionTypes.Search;

  constructor(public payload: { searchQuery: string }) {}
}

export class SearchSuccessAction implements Action {
  readonly type = SearchActionTypes.SearchSuccess;

  constructor(public payload: { searchResults: string[] }) {}
}

export class SearchFailureAction implements Action {
  readonly type = SearchActionTypes.SearchFailure;

  constructor(public payload: { errorMessage: string }) {}
}

export type SearchActions = SearchAction | SearchSuccessAction | SearchFailureAction;
