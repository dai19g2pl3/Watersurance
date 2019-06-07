export const FETCH_HABITATION_SENSOR_SUCCESS = "FETCH_HABITATION_SENSOR_SUCCESS";
export const FETCH_HABITATION_SENSOR_FAILURE = "FETCH_HABITATION_SENSOR_FAILURE";
export const ADD_SENSOR_OCCURRENCE_SUCCESS = "ADD_SENSOR_OCCURRENCE_SUCCESS";

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

  export const addSensorOccurrence = (dates, id) => {
    return dispatch => {
      fetch(`http://localhost:8080/api/occurrenceSensor/` + id, {
        method: "POST",
        credentials: "include",
        headers: headers,
        body: JSON.stringify(dates)
      })
        .then(res => res.json())
        .then(res => {
          dispatch({
            type: ADD_SENSOR_OCCURRENCE_SUCCESS,
          });
        });
    };
  };