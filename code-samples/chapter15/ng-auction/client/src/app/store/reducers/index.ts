import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RouterReducerState } from '@ngrx/router-store';

import { RouterStateUrl } from '../../shared/services';
import * as fromSearch from './search';

export interface State {
  router: RouterReducerState<RouterStateUrl>;
  search: fromSearch.State;
}

export const reducers = {
  search: fromSearch.reducer
};

export const getSearchState = createFeatureSelector<fromSearch.State>('search');
export const getSearchParams = createSelector(getSearchState, fromSearch.getParams);

export const getRouterState = createFeatureSelector<RouterReducerState<RouterStateUrl>>('router');
export const getRouteUrl = createSelector(getRouterState, router => router.state.url);
export const getRouteParams = createSelector(getRouterState, router => router.state.params);
export const getRouteQueryParams = createSelector(getRouterState, router => router.state.queryParams);
