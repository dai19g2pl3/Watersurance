export const FETCH_OCURRENCES = "FETCH_OCURRENCES";
export const FETCH_LAST_OCURRENCES = "FETCH_LAST_OCURRENCES";

export const getAllOcurrences = () => {
  return dispatch => {
    fetch(`http://localhost:5000/api/ocurrences`, {
      method: "GET",
      credentials: "include"
    })
      .then(res => res.json())
      .then(ocurrences => {
        console.log("deu fetch");
        dispatch({
          type: FETCH_OCURRENCES,
          payload: ocurrences
        });
      });
  };
};

export const getLastOcurrences = () => {
    return dispatch => {
      fetch(`http://localhost:5000/api/lastOcurrences`, {
        method: "GET",
        credentials: "include"
      })
        .then(res => res.json())
        .then(lastOcurrences => {
          console.log("deu fetch");
          dispatch({
            type: FETCH_LAST_OCURRENCES,
            payload: lastOcurrences
          });
        });
    };
  };