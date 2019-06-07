import users from "./usersReducer";
import ocurrences from "./ocurrencesReducer";
import habitations from "./habitationsReducer";
import objectSensor from "./objectSensorReducer";
import habitationSensor from "./habitationSensorReducer";
import firstTime from "./firstTimeReducer";
import startDate from "./startDateReducer";
//import contracts from "./contractsReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  users,
  ocurrences,
  habitations,
  objectSensor,
  habitationSensor,
  firstTime,
  startDate,
  //contracts
});

export default rootReducer;
