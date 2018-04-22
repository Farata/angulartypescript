import {createFeatureSelector, createSelector} from '@ngrx/store';
import {State} from './reducers';

export const getState = createFeatureSelector<State>('myReducer');
export const getSearchQuery = createSelector(getState, state => state.searchQuery);
export const getSearchResults = createSelector(getState, state => state.searchResults);
export const getError = createSelector(getState, state => state.errorMessage);
