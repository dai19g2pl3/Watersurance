import { ALTER_FIRST_TIME, FETCH_FIRST_TIME } from "../actions/firstTimeAction";

let initialState = [1];

export default (state = initialState, action) => {
  switch (action.type) {
    case ALTER_FIRST_TIME:
      return [action.payload];
    case FETCH_FIRST_TIME:
        return state;
    default:
      return state;
  }
};