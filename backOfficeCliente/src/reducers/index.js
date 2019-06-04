import users from "./usersReducer";
import ocurrences from "./ocurrencesReducer";
import habitations from "./habitationsReducer";
import objectSensor from "./objectSensorReducer";
//import contracts from "./contractsReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  users,
  ocurrences,
  habitations,
  objectSensor
  //contracts
});

export default rootReducer;
