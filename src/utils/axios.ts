import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://taskpro.itmingo.com/api",
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

export default axiosInstance;
