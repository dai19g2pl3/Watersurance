import { FETCH_HABITATION_SENSOR_SUCCESS, FETCH_HABITATION_SENSOR_FAILURE } from "../actions/habitationSensorAction";

let initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_HABITATION_SENSOR_SUCCESS:
      return [action.payload];
    case FETCH_HABITATION_SENSOR_FAILURE:
      return `error: ${action.payload}`
    default:
      return state;
  }
};