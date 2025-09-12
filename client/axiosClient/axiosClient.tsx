import axios from "axios";

const axiosClient = axios.create({
  //   baseURL: "http://localhost:8000",
  baseURL: "http://localhost:8000/api",
  withCredentials: true,
});

export default axiosClient;
