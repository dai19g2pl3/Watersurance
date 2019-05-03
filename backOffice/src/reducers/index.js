import users from "./usersReducer";
import ocurrences from "./ocurrencesReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  users,
  ocurrences
});

export default rootReducer;
