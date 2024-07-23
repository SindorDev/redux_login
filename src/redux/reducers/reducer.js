import { saveToLocalStorage } from "../../helpers/index"

const initialState = {
     token: localStorage.getItem("x-auth-token") || null,
     user: null,
     loading: false,
     error: null,
     isSuccessful: false,
     isError: false
}

const reducer = (state = initialState, action) => {
     switch(action.type) {

          case "LOGIN_USER":
          case "REGISTER_USER":
               saveToLocalStorage("x-auth-token", action.token)
               return {
                    ...state,
                    token: action.token,
                    user: action.user,
                    loading: false,
                    isSuccessful: true,
               }
          case "LOADING": 
               return {
                    ...state,
                    loading: true
               }
          case "ERROR":
               return {
                    ...state,
                    loading: false,
                    isSuccessful: false,
                    isError: true,
                    error: action.message
               }
               
          case "SIGN_OUT":
               localStorage.removeItem("x-auth-token")
               return {
                    token: null,
                    user: null,
                    ...state,
               }
          default: 
               return {
                    state
               }
     }
}


export default reducer