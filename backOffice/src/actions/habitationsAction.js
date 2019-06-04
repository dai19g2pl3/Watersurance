export const FETCH_HABITATIONS_SUCCESS = "FETCH_HABITATIONS_SUCCESS";
export const FETCH_HABITATIONS_FAILURE = "FETCH_HABITATIONS_FAILURE";

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
