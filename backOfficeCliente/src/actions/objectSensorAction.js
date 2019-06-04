export const FETCH_OBJECT_SENSOR_SUCCESS = "FETCH_OBJECT_SENSOR_SUCCESS";
export const FETCH_OBJECT_SENSOR_FAILURE = "FETCH_OBJECT_SENSOR_FAILURE";

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
            type: FETCH_OBJECT_SENSOR_SUCCESS,
            payload: response
          });
        },
        error => {
          dispatch({ type: FETCH_OBJECT_SENSOR_FAILURE, payload: error.response });
        }
      );
  };