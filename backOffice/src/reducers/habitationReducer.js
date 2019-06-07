import { FETCH_HABITATION_SUCCESS, FETCH_HABITATION_FAILURE } from "../actions/habitationsAction";

let initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_HABITATION_SUCCESS:
      return [action.payload];
    case FETCH_HABITATION_FAILURE:
      return `error: ${action.payload}`
    default:
      return state;
  }
};