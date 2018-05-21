import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../../store';
import * as fromCategories from './categories';
import * as fromProducts from './products';

export interface HomeState {
  categories: fromCategories.State;
  products: fromProducts.State;
}

export interface State extends fromRoot.State {
  homePage: HomeState;
}

export const reducers = {
  categories: fromCategories.reducer,
  products: fromProducts.reducer
};

/**
 * Selectors
 */

export const getHomeState = createFeatureSelector<HomeState>('homePage');

export const getProductsState = createSelector(getHomeState, state => state.products);
export const getProductsData = createSelector(getProductsState, fromProducts.getData);
export const getProductsDataLoading = createSelector(getProductsState, fromProducts.getDataLoading);
export const getProductsDataLoadingError = createSelector(getProductsState, fromProducts.getDataLoadingError);

export const getCategoriesState = createSelector(getHomeState, state => state.categories);
export const getCategoriesData = createSelector(getCategoriesState, fromCategories.getData);
