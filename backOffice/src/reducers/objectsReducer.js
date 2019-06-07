import { ADD_OBJECT_SUCCESS, UPDATE_OBJECT_SUCCESS, DELETE_OBJECT_SUCCESS } from "../actions/objectsAction";

let initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_OBJECT_SUCCESS:
      return [];
    case UPDATE_OBJECT_SUCCESS:
      return [];
    case DELETE_OBJECT_SUCCESS:
      return [];
    default:
      return state;
  }
};