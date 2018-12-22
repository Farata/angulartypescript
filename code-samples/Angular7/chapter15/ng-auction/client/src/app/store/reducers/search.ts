import { SearchActions, SearchActionTypes } from '../actions';


export interface State {
  params: { [key: string]: any };
}

const initialState: State = {
  params: {}
};

export function reducer(state = initialState, action: SearchActions): State {
  switch (action.type) {
    case SearchActionTypes.Search: {
      return {
        ...state,
        params: action.payload.params
      };
    }

    default: {
      return state;
    }
  }
}

export const getParams = (state: State) => state.params;
