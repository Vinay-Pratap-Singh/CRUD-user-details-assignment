import axios, { AxiosInstance } from "axios";

const BASEURL = process.env.REACT_APP_BASEURL;
const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASEURL,
});

export default axiosInstance;
