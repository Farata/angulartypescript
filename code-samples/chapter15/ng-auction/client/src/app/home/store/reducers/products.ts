import { Product } from '../../../shared/services';
import { ProductsActions, ProductsActionTypes } from '../actions';

export interface State {
  data: Product[];
  loading: boolean;
  loadingError?: string;
}

export const initialState: State = {
  data: [],
  loading: false
};

export function reducer(state = initialState, action: ProductsActions): State {
  switch (action.type) {
    case ProductsActionTypes.Load: {
      return {
        ...state,
        loading: true,
        loadingError: null
      };
    }

    case ProductsActionTypes.LoadSuccess: {
      return {
        ...state,
        data: action.payload.products,
        loading: false,
        loadingError: null
      };
    }

    case ProductsActionTypes.LoadFailure: {
      return {
        ...state,
        data: [],
        loading: false,
        loadingError: action.payload.error
      };
    }

    default: {
      return state;
    }
  }
}

/**
Accessors for the data in the products state object
These accessors are used to create selectors defined in index.ts
We're defining these functions here to keep them where the State interface is declared
*/
export const getData = (state: State) => state.data;
export const getDataLoading = (state: State) => state.loading;
export const getDataLoadingError = (state: State) => state.loadingError;
