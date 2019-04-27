import { combineReducers } from "redux";

import auth from "./auth-reducer";
import docs from "./documents-reducer";
import formulario from "./formulario-reducer"
import despesas from "./despesas-reducer"
import users from "./manageusers-reducer"

const appReducer = combineReducers({
  auth,docs,formulario,despesas, users
})

const rootReducer = (state, action) => {
  if(action.type === "USERS_LOGOUT"){
    state = undefined;
  }
  return appReducer(state, action)
}


export default rootReducer;
