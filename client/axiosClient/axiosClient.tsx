import axios from "axios";

const axiosClient = axios.create({
  //   baseURL: "http://localhost:8000",
  baseURL: `${import.meta.env.VITE_BE_URL || ""}/api`,
  withCredentials: true,
});

export default axiosClient;
