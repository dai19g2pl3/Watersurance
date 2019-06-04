export const ADD_OBJECT_SUCCESS = "ADD_OBJECT_SUCCESS";

const headers = new Headers({
  "Content-Type": "application/json"
});

function getCookie(name) {
  var v = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
  return v ? v[2] : null;
}

headers.append("Authorization", "Bearer " + getCookie("token"));

export const addObject = (object, id) => {
    return dispatch => {
      fetch(`https://watersurance-api.herokuapp.com/api/insuredObject/` + id, {
        method: "POST",
        credentials: "include",
        headers: headers,
        body: JSON.stringify(object)
      })
        .then(res => res.json())
        .then(res => {
          console.log("deu fetch");
          dispatch({
            type: ADD_OBJECT_SUCCESS,
          });
        });
    };
  };