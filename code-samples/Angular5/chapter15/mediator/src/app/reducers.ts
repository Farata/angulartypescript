import {SearchActions, SEARCH, SEARCH_SUCCESS} from './actions';

export interface State {
  searchQuery: string;
  searchResults: string[];
}

const initialState: State = {
  searchQuery: '',
  searchResults: []
};

export function reducer(state = initialState, action: SearchActions): State {
  switch (action.type) {

    case SEARCH: {
      return {
        ...state,
        searchQuery: action.payload.searchQuery,
        searchResults: []
      }
    }

    case SEARCH_SUCCESS: {
      return {
        ...state,
        searchResults: action.payload.searchResults
      }
    }

    default: {
      return state;
    }
  }
}
