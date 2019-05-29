export const FETCH_USERS = "FETCH_USERS";
export const ADD_USER = "ADD_USER";

const headers = new Headers({
  'Content-Type': 'application/json',
})

function getCookie(name) {
  var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
  return v ? v[2] : null;
}

headers.append('Authorization', 'Bearer ' + getCookie('token'));

export const getAllUsers = () => {
  return dispatch => {
    fetch(`https://watersurance-api.herokuapp.com/api/users`, {
      method: "GET",
      headers: headers
    })
      .then(res => res.json())
      .then(users => {
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
      credentials: "include",
      headers: headers
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
