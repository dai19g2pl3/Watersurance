export const FETCH_HABITATIONS_SUCCESS = "FETCH_HABITATIONS_SUCCESS";
export const FETCH_HABITATIONS_FAILURE = "FETCH_HABITATIONS_FAILURE";
export const ADD_HABITATION_SUCCESS = "ADD_HABITATION_SUCCESS";
export const FETCH_HABITATION_SUCCESS = "FETCH_HABITATION_SUCCESS";
export const FETCH_HABITATION_FAILURE = "FETCH_HABITATION_FAILURE";
export const RESET_HABITATION_SUCCESS = "RESET_HABITATION_SUCCESS";


const headers = new Headers({
  "Content-Type": "application/json"
});

function getCookie(name) {
  var v = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
  return v ? v[2] : null;
}

headers.append("Authorization", "Bearer " + getCookie("token"));

export const fetchAllHabitations = () => dispatch => {
  fetch(`https://watersurance-api.herokuapp.com/api/habitations`, {
    method: "GET",
    headers: headers
  })
    .then(res => res.json())
    .then(
      response => {
        dispatch({
          type: FETCH_HABITATIONS_SUCCESS,
          payload: response
        });
      },
      error => {
        dispatch({ type: FETCH_HABITATIONS_FAILURE, payload: error.response });
      }
    );
};

export const fetchHabitation = (id) => dispatch => {
  fetch(`https://watersurance-api.herokuapp.com/api/habitation/` + id, {
    method: "GET",
    headers: headers
  })
    .then(res => res.json())
    .then(
      response => {
        dispatch({
          type: FETCH_HABITATION_SUCCESS,
          payload: response
        });
      },
      error => {
        dispatch({ type: FETCH_HABITATION_FAILURE, payload: error.response });
      }
    );
};

export const addHabitation = (habitation, id) => {
  return dispatch => {
    fetch(`https://watersurance-api.herokuapp.com/api/habitation/` + id, {
      method: "POST",
      credentials: "include",
      headers: headers,
      body: JSON.stringify(habitation)
    })
      .then(res => res.json())
      .then(res => {
        console.log("deu fetch");
        dispatch({
          type: ADD_HABITATION_SUCCESS,
        });
      });
  };
};

export const resetHabitation = () => {
  return dispatch => {
    dispatch({
      type: RESET_HABITATION_SUCCESS,
    });
  };
};