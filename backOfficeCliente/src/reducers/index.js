import users from "./usersReducer";
import ocurrences from "./ocurrencesReducer";
//import contracts from "./contractsReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  users,
  ocurrences
  //contracts
});

export default rootReducer;
