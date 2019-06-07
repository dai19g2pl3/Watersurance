import { FETCH_HABITATION_SENSOR_SUCCESS, FETCH_HABITATION_SENSOR_FAILURE, ADD_SENSOR_OCCURRENCE_SUCCESS } from "../actions/habitationSensorAction";

let initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_HABITATION_SENSOR_SUCCESS:
      return [action.payload];
    case FETCH_HABITATION_SENSOR_FAILURE:
      return `error: ${action.payload}`
    case ADD_SENSOR_OCCURRENCE_SUCCESS:
      return state;
    default:
      return state;
  }
};