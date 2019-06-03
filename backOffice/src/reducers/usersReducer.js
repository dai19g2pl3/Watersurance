import { FETCH_USERS_SUCCESS, DELETE_USER_SUCCESS, ADD_USER_SUCCESS, FETCH_USERS_FAILURE, ADD_USER_FAILURE, UPDATE_USER_SUCCESS } from "../actions/usersAction";
let initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_SUCCESS:
      return [...action.payload];
    case FETCH_USERS_FAILURE:
      return `error: ${action.payload}`
    case ADD_USER_SUCCESS:
      return [...state, ...action.payload];
    case ADD_USER_FAILURE:
      return `error: ${action.payload}`
    case DELETE_USER_SUCCESS:
      return [];
    case UPDATE_USER_SUCCESS:
      return [];
    default:
      return state;
  }
};
