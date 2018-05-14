import {SearchActions, SearchActionTypes} from './actions';

export interface State {
  searchQuery: string;
  searchResults: string[];
  errorMessage?: string;
}

const initialState: State = {
  searchQuery: '',
  searchResults: []
};

export function reducer(state = initialState, action: SearchActions): State {
  switch (action.type) {

    case SearchActionTypes.Search: {
      return {
        ...state,
        searchQuery: action.payload.searchQuery,
        searchResults: []
      }
    }

    case SearchActionTypes.SearchSuccess: {
      return {
        ...state,
        searchResults: action.payload.searchResults,
        errorMessage: ''
      }
    }

    case SearchActionTypes.SearchFailure: {
      return {
        ...state,
        errorMessage: action.payload.errorMessage
      }
    }

    default: {
      return state;
    }
  }
}
