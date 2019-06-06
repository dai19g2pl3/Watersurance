import users from "./usersReducer";
import ocurrences from "./ocurrencesReducer";
import sensors from "./sensorsReducer.js";
import habitations from "./habitationsReducer.js";
import objects from "./objectsReducer.js";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  users,
  ocurrences,
  sensors,
  habitations,
  objects
});

export default rootReducer;
