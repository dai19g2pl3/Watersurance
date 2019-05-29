export const FETCH_USERS = "FETCH_USERS";
export const ADD_USER = "ADD_USER";

export const getAllUsers = () => {
  return dispatch => {
    fetch(`https://watersurance-api.herokuapp.com/api/users`, {
      method: "GET",
      credentials: "include"
    })
      .then(res => res.json())
      .then(users => {
        console.log("deu fetch");
        dispatch({
          type: FETCH_USERS,
          payload: users
        });
      });
  };
};

export const addUser = newUser => {
  return dispatch => {
    fetch(`https://watersurance-api.herokuapp.com/api/signup`, {
      method: "POST",
      credentials: "include"
    })
      .then(res => res.json())
      .then(users => {
        console.log("deu fetch");
        dispatch({
          type: ADD_USER,
          payload: newUser
        });
      });
  };
};
