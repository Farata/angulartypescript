import {createFeatureSelector, createSelector} from '@ngrx/store';
import {State} from './reducers';

export const getState = createFeatureSelector('reducer');
export const getSearchQuery = createSelector(getState, (state: State) => state.searchQuery);
export const getSearchResults = createSelector(getState, (state: State) => state.searchResults);
