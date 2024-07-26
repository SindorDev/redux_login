import axios from "axios";
import store from "../redux/store/store"



const apiInstance = axios.create({
     baseURL: import.meta.env.VITE_API,
     headers: {
          "Content-Type": "application/json"
     },
     timeout: 100000

});


apiInstance.interceptors.request.use((request) => {
     if(request) {
          request.headers.Authorization = `Bearer ${store.getState().token}`
     }
     return request
},
     (error) => {   
          return Promise.reject(error)})

apiInstance.interceptors.response.use((response) => {
     if(response) {
          return response
     }
},  
     (error) => {
          if(error.response?.status === 401 || error.response?.status === 403) {
               store.dispatch({type: "SIGN_OUT"})
          }
          return Promise.reject(error)
     }
)

export default apiInstance