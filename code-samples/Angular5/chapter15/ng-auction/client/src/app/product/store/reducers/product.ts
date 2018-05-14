import { Product } from '../../../shared/services';
import { ProductActions, ProductActionTypes } from '../actions';


export interface State {
  selected?: Product;
  suggested: Product[];
}

const initialState: State = {
  suggested: []
};

export function reducer(state = initialState, action: ProductActions): State {
  switch (action.type) {
    case ProductActionTypes.LoadByIdSuccess: {
      return {
        ...state,
        selected: action.payload.product
      };
    }

    case ProductActionTypes.LoadSuggestedSuccess: {
      return {
        ...state,
        suggested: action.payload.products
      };
    }

    default: {
      return state;
    }
  }
}

export const getSelected = (state: State) => state.selected;
export const getSuggested = (state: State) => state.suggested;
