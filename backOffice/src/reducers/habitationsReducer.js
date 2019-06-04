import { FETCH_HABITATIONS_SUCCESS, FETCH_HABITATIONS_FAILURE } from "../actions/habitationsAction";

let initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_HABITATIONS_SUCCESS:
      return [...action.payload];
    case FETCH_HABITATIONS_FAILURE:
      return `error: ${action.payload}`
    default:
      return state;
  }
};