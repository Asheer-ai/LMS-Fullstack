import axios from "axios"

const Base_URL="http://localhost:5014/api/v1";

const axiosInstance=axios.create();

axiosInstance.defaults.baseURL=Base_URL;
axiosInstance.defaults.withCredentials=true;

export default axiosInstance;