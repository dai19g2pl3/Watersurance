import users from './usersReducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  users
})

export default rootReducer