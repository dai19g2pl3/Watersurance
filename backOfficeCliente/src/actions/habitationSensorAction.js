export const FETCH_HABITATION_SENSOR_SUCCESS = "FETCH_HABITATION_SENSOR_SUCCESS";
export const FETCH_HABITATION_SENSOR_FAILURE = "FETCH_HABITATION_SENSOR_FAILURE";

const headers = new Headers({
    "Content-Type": "application/json"
  });
  
  function getCookie(name) {
    var v = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
    return v ? v[2] : null;
  }
  
  headers.append("Authorization", "Bearer " + getCookie("token"));

  export const fetchHabitationSensor = (id) => dispatch => {
    fetch(`https://watersurance-api.herokuapp.com/api/habitationSensor/` + id , {
      method: "GET",
      headers: headers
    })
      .then(res => res.json())
      .then(
        response => {
          console.log('deu fetch habitation');
          dispatch({
            type: FETCH_HABITATION_SENSOR_SUCCESS,
            payload: response
          });
        },
        error => {
          dispatch({ type: FETCH_HABITATION_SENSOR_FAILURE, payload: error.response });
        }
      );
  };