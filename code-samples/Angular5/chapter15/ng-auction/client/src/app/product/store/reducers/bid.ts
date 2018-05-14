import { BidActions, BidActionTypes } from '../actions';


export interface State {
  bids: { [productId: number]: number };
}

const initialState: State = {
  bids: {}
};

export function reducer(state = initialState, action: BidActions): State {
  switch (action.type) {
    case BidActionTypes.BidUpdate: {
      const { productId, amount } = action.payload;
      return {
        ...state,
        bids: { ...state.bids, [ productId ]: amount }
      };
    }

    default: {
      return state;
    }
  }
}

export const getBids = (state: State) => state.bids;
