import { formularioApi } from '../../api/formulario-api.js';

export const ESCRITORIOS_GET_REQUEST = "ESCRITORIOS_GET_REQUEST";
export const ESCRITORIOS_GET_SUCCESS = "ESCRITORIOS_GET_SUCCESS";
export const ESCRITORIOS_GET_FAILURE = "ESCRITORIOS_GET_FAILURE";

export const COMPANHIAS_GET_REQUEST = "COMPANHIAS_GET_REQUEST";
export const COMPANHIAS_GET_SUCCESS = "COMPANHIAS_GET_SUCCESS";
export const COMPANHIAS_GET_FAILURE = "COMPANHIAS_GET_FAILURE";

export const getEscritorios = () => dispatch =>{
  dispatch({ type: ESCRITORIOS_GET_REQUEST});
  formularioApi.getEscritorio().then(
    response => {
      dispatch({
        type: ESCRITORIOS_GET_SUCCESS,
        payload: response.data
      });
    },
    error => {
      dispatch({ type: ESCRITORIOS_GET_FAILURE, payload: error.response})
    }
  );
};


export const getCompanhias = () => dispatch =>{
  dispatch({ type: COMPANHIAS_GET_REQUEST});
  formularioApi.getCompanhias().then(
    response => {
      dispatch({
        type: COMPANHIAS_GET_SUCCESS,
        payload: response.data
      });
    },
    error => {
      dispatch({ type: COMPANHIAS_GET_FAILURE, payload: error.response})
    }
  );
};
