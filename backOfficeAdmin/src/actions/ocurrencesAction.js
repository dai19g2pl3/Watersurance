export const FETCH_OCURRENCES = "FETCH_OCURRENCES";
export const FETCH_LAST_OCURRENCES = "FETCH_LAST_OCURRENCES";
/*
export const getAllOcurrences = () => {
  return dispatch => {
    const headers = new Headers({
      "Content-Type": "application/json",
    })
    const options = {
      headers: headers
    }
    fetch(`http://localhost:5000/api/ocurrences`,{
      mode: 'cors'
    })
      .then(response => response.json());
      /*
      .then(ocurrences => {
        console.log("deu fetch");
        dispatch({
          type: FETCH_OCURRENCES,
          payload: ocurrences
        });
      });
      
  };
};
*/
export const getLastOcurrences = () => {
  return dispatch => {
    fetch(`http://localhost:5000/api/lastOcurrences`, {
      method: "GET",
      mode: "no-cors"
    }).then(res => console.log(res));
    /*
        .then(lastOcurrences => {
          console.log("deu fetch");
          dispatch({
            type: FETCH_LAST_OCURRENCES,
            payload: lastOcurrences
          });
        });
        */
  };
};
