export const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
export const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";
export const ADD_USER_SUCCESS = "ADD_USER_SUCCESS";
export const ADD_USER_FAILURE = "ADD_USER_FAILURE";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAILURE = "UPDATE_USER_FAILURE";
export const DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS";
export const DELETE_USER_FAILURE = "DELETE_USER_FAILURE";

const headers = new Headers({
  "Content-Type": "application/json"
});

function getCookie(name) {
  var v = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
  return v ? v[2] : null;
}

headers.append("Authorization", "Bearer " + getCookie("token"));

export const fetchAllUsers = () => dispatch => {
  fetch(`https://watersurance-api.herokuapp.com/api/users`, {
    method: "GET",
    headers: headers
  })
    .then(res => res.json())
    .then(
      response => {
        dispatch({
          type: FETCH_USERS_SUCCESS,
          payload: response
        });
      },
      error => {
        dispatch({ type: FETCH_USERS_FAILURE, payload: error.response });
      }
    );
};

export const addUser = user => dispatch => {
  fetch(`https://watersurance-api.herokuapp.com/api/signup` + user.id, {
    method: "POST",
    credentials: "include",
    headers: headers
  })
    .then(res => res.json())
    .then(
      dispatch({
        type: ADD_USER_SUCCESS,
        payload: user
      }),
      error => {
        dispatch({ type: ADD_USER_FAILURE, payload: error.response });
      }
    );
};

/*
export const deleteUser = (id) => {
  return dispatch => {
    fetch(`https://watersurance-api.herokuapp.com/api/user/` + id , {
      method: "DELETE",
      credentials: "include",
      headers: headers
    })
      .then(res => res.json())
      .then(res => {
        console.log("deu fetch");
        dispatch({
          type: DELETE_USER,
        });
      });
  };
};
*/
