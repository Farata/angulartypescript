import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../../store';
import * as fromBid from './bid';
import * as fromProduct from './product';


export interface ProductState {
  product: fromProduct.State;
  bid: fromBid.State;
}

export interface State extends fromRoot.State {
  productPage: ProductState;
}

export const reducers = {
  product: fromProduct.reducer,
  bid: fromBid.reducer
};

/**
 * Selectors
 */

export const getProductPageState = createFeatureSelector<ProductState>('productPage');
export const getProductState = createSelector(getProductPageState, state => state.product);
export const getSelectedProduct = createSelector(getProductState, fromProduct.getSelected);
export const getSuggestedProducts = createSelector(getProductState, fromProduct.getSuggested);

export const getBidState = createSelector(getProductPageState, state => state.bid);
export const getBids = createSelector(getBidState, fromBid.getBids);
