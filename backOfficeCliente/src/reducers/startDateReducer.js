import { ALTER_START_DATE, FETCH_START_DATE } from "../actions/startDateAction";

let initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case ALTER_START_DATE:
      return [action.payload];
    case FETCH_START_DATE:
        return state;
    default:
      return state;
  }
};