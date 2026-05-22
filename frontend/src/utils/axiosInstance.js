import axios from "axios";

const BASE_URL = "http://localhost:3000/api"

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    // baseURL: "http://localhost:3000/api",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
})

export default axiosInstance;