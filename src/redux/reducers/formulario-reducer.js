import{
  ESCRITORIOS_GET_REQUEST,
  ESCRITORIOS_GET_SUCCESS,
  ESCRITORIOS_GET_FAILURE,
  COMPANHIAS_GET_REQUEST,
  COMPANHIAS_GET_SUCCESS,
  COMPANHIAS_GET_FAILURE
} from "../actions/formulario-actions";


const initialState = {
  escritorios:{},
  loading: false,
  companhias:{}
};


const formulario = (state = initialState, {type,payload} ) => {
  switch(type){
    case ESCRITORIOS_GET_REQUEST:
      return { ...state, loading:true, error: {} };
    case  ESCRITORIOS_GET_SUCCESS:
      return {...state, loading:false, error: false, escritorios:payload};
    case ESCRITORIOS_GET_FAILURE:
      return {...state, loading: false, error: payload};
    case COMPANHIAS_GET_REQUEST:
      return { ...state, loading:true, error: {} };
    case COMPANHIAS_GET_SUCCESS:
      return {...state, loading:false, error: false, companhias:payload};
    case COMPANHIAS_GET_FAILURE:
      return {...state, loading: false, error: payload};
    default: return state
  }
};

export default formulario;
