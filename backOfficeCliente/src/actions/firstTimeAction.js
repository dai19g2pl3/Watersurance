export const ALTER_FIRST_TIME = "ALTER_FIRST_TIME";
export const FETCH_FIRST_TIME = "FETCH_FIRST_TIME";

export const alterFirstTime = (number) => dispatch => {
    dispatch({
        type: ALTER_FIRST_TIME,
        payload: number
    });
  };

  export const fetchFirstTime = () => dispatch => {
    dispatch({
        type: FETCH_FIRST_TIME,
    });
  };