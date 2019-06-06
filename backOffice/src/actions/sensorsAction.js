export const FETCH_SENSORS_SUCCESS = "FETCH_SENSORS_SUCCESS";
export const FETCH_SENSORS_FAILURE = "FETCH_SENSORS_FAILURE";

const headers = new Headers({
    "Content-Type": "application/json"
  });
  
  function getCookie(name) {
    var v = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
    return v ? v[2] : null;
  }
  
  headers.append("Authorization", "Bearer " + getCookie("token"));

  export const fetchObjectSensor = (id) => dispatch => {
    fetch(`https://watersurance-api.herokuapp.com/api/objectSensor/` + id , {
      method: "GET",
      headers: headers
    })
      .then(res => res.json())
      .then(
        response => {
          dispatch({
            type: FETCH_SENSORS_SUCCESS,
            payload: response
          });
        },
        error => {
          dispatch({ type: FETCH_SENSORS_FAILURE, payload: error.response });
        }
      );
  };