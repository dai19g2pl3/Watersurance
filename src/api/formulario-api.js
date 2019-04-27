import axios from "axios";

export const formularioApi = {
  getEscritorio,
  getCompanhias
}



function getEscritorio(){
  return axios.get("/escritorios");
}


function getCompanhias(){
  return axios.get("/companhias");
}
