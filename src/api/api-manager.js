import axios from "axios";

const URL = "http://localhost:8000";
const TOKEN_KEY = "";

const init = () => {
  axios.defaults.baseURL = URL;
  axios.defaults.headers.common["Content-Type"] = "application/json";
  axios.defaults.headers.common["Accept"] = "application/json";

  const storedToken = localStorage.getItem(TOKEN_KEY);
  if (storedToken !== null) setAuthToken(storedToken);
};

const setAuthToken = token => {
  localStorage.setItem(TOKEN_KEY, token);
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

const removeAuthToken = () => {
  localStorage.clear();
  axios.defaults.headers.common["Authorization"] = null;
};

const isLoggedIn = () => {
  return localStorage.getItem(TOKEN_KEY) !== null;
};

export default { init, setAuthToken, removeAuthToken, isLoggedIn };
