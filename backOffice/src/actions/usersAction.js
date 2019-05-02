export const FETCH_USERS = 'FETCH_USERS'
export const ADD_USER = 'ADD_USER'

export const getAllUsers = () => {
  return (dispatch) => {
    fetch(`http://localhost:8080/api/users`, {
      method: 'GET',
      credentials: 'include', 
    })
      .then(res => res.json())
      .then(users => {
        console.log('deu fetch')
        dispatch({
          type: FETCH_USERS,
          payload: users
        })
      })
  }
} 

export const addUser = (newUser) => {
  return (dispatch) => {
    dispatch({
      type: ADD_USER,
      payload: newUser
    })
  }
}