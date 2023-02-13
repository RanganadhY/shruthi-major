import axios from "axios";

const axiosInstance=axios.create({
    
    baseURL:"http://localhost:3001",
    // headers:{ baseURL
    //     'Content-Type': 'multipart/form-data'
    // }
    
});

export default axiosInstance;