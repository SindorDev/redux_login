import axios from "axios";

const apiInstance = axios.create({
     baseURL: "http://localhost:8000",
     headers: {
          "Content-Type": "application/json",
     },
     timeout: 1000

});

export default apiInstance