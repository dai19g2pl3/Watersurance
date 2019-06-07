export const ALTER_START_DATE = "ALTER_START_DATEE";
export const FETCH_START_DATE = "FETCH_START_DATE";

export const alterStartDate = (date) => dispatch => {
    dispatch({
        type: ALTER_START_DATE,
        payload: date
    });
  };

  export const fetchStartDate = () => dispatch => {
    dispatch({
        type: FETCH_START_DATE,
    });
  };