import { FETCH_SENSORS_SUCCESS, FETCH_SENSORS_FAILURE } from "../actions/sensorsAction";

let initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SENSORS_SUCCESS:
      return [...action.payload];
    case FETCH_SENSORS_FAILURE:
      return `error: ${action.payload}`
    default:
      return state;
  }
};