import { FETCH_OBJECT_SENSOR_SUCCESS, FETCH_OBJECT_SENSOR_FAILURE } from "../actions/objectSensorAction";

let initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_OBJECT_SENSOR_SUCCESS:
      return [action.payload];
    case FETCH_OBJECT_SENSOR_FAILURE:
      return `error: ${action.payload}`
    default:
      return state;
  }
};