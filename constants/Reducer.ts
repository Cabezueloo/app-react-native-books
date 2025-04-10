// reducer.js
export const initialState = {
    books: [],
    loading: false,
    error: null,
    page: 1,
    isListEnd: false,
  };
  
  export const actionTypes = {
    API_REQUEST: 'API_REQUEST',
    API_SUCCESS: 'API_SUCCESS',
    API_FAILURE: 'API_FAILURE',
    API_LIST_END: 'API_LIST_END',
    RESET: 'RESET',
    SET_PAGE: 'SET_PAGE'
  };
  
  export function reducer(state, action) {
    switch (action.type) {
      case actionTypes.API_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case actionTypes.API_SUCCESS:
        return {
          ...state,
          loading: false,
          books: state.page === 1 
            ? action.payload.books  // if first page, replace
            : [...state.books, ...action.payload.books], // else append
        };
      case actionTypes.API_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.error,
        };
      case actionTypes.API_LIST_END:
        return {
          ...state,
          isListEnd: true,
          loading: false,
        };
      case actionTypes.SET_PAGE:
        return {
          ...state,
          page: action.payload,
        };
      case actionTypes.RESET:
        return {
          ...initialState,
        };
        
      default:
        return state;
    }
  }
  