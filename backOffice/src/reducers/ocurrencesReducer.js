import { FETCH_OCURRENCES, FETCH_LAST_OCURRENCES } from "../actions/ocurrencesAction";


let initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_OCURRENCES:
      return [...state, ...action.payload];
    case FETCH_LAST_OCURRENCES:
      return [...state, ...action.payload];
    default:
      return state;
  }
};