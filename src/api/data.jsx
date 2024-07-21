import axios from "axios";

const apiInstance = axios.create({
     baseURL: import.meta.env.Api,
     headers: {
          "Content-Type": "application/json",
     },
     timeout: 1000

});

export default apiInstance