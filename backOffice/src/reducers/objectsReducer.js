import { ADD_OBJECT_SUCCESS } from "../actions/objectsAction";

let initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_OBJECT_SUCCESS:
      return [];
    default:
      return state;
  }
};