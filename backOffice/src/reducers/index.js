import users from "./usersReducer";
import addUser from "./usersReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  users,
  addUser
});

export default rootReducer;
