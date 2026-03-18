import axios from "axios";

const axiosInstance = axios.create({
    // baseURL:"http://127.0.0.1:5001/e-clone-5f26b/us-central1/api"
    // deployed version of renderMatches.com
    baseURL:"https://amazon-clone-api-backend.onrender.com"
})
export  {axiosInstance}