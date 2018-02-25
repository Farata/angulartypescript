import { CategoriesActions, CategoriesActionTypes } from '../actions';


export interface State {
  data: string[];
}

const initialState: State = {
  data: []
};

export function reducer(state = initialState, action: CategoriesActions): State {
  switch (action.type) {
    case CategoriesActionTypes.LoadSuccess: {
      return {
        ...state,
        data: action.payload.categories
      };
    }

    default: {
      return state;
    }
  }
}

export const getData = (state: State) => state.data;
