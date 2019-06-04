import users from "./usersReducer";
import ocurrences from "./ocurrencesReducer";
import habitations from "./habitationsReducer"
//import contracts from "./contractsReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  users,
  ocurrences,
  habitations
  //contracts
});

export default rootReducer;
