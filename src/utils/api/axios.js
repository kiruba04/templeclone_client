import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL + "/api",
  withCredentials: true, // optional, for cookies/auth
});

export default instance;
