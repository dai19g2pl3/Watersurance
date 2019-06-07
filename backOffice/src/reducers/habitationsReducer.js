import { FETCH_HABITATIONS_SUCCESS, FETCH_HABITATIONS_FAILURE, ADD_HABITATION_SUCCESS, RESET_HABITATION_SUCCESS } from "../actions/habitationsAction";

let initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_HABITATIONS_SUCCESS:
      return [...action.payload];
    case FETCH_HABITATIONS_FAILURE:
      return `error: ${action.payload}`
    case ADD_HABITATION_SUCCESS:
      return [];
    case RESET_HABITATION_SUCCESS:
      return [];
    default:
      return state;
  }
};