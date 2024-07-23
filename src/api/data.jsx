import axios from "axios";
import store from "../redux/store/store"

const token = store.getState().state.token


const apiInstance = axios.create({
     baseURL: import.meta.env.VITE_API,
     headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
     },
     timeout: 1000

});

apiInstance.interceptors.response.use((response) => {
     if(response) {
          return response
     }
},  
     (error) => {
          if(error.response?.status === 401 || error.response?.status === 403 || error.response?.status === 405) {
               store.dispatch({type: "SIGN_OUT"})
          }
          return Promise.reject(error)
     }
)

export default apiInstance