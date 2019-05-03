import { FETCH_USERS } from "../actions/usersAction";
import { ADD_USER } from "../actions/usersAction";
let initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS:
      return [...state, ...action.payload];
    case ADD_USER:
      return [...state, ...action.payload];
    default:
      return state;
  }
};
