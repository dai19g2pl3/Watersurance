import { FETCH_USERS } from '../actions/usersAction'

let initialState = []

export default (state = initialState, action) => {
  switch(action.type) {
    case FETCH_USERS:
      return [...state, ...action.payload]
    default:
      return state
  }
}