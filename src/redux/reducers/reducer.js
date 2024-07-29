/* eslint-disable no-fallthrough */
import { saveToLocalStorage } from "../../helpers/index"

const initialState = {
     token: localStorage.getItem("x-auth-token") || null,
     user: JSON.parse(localStorage.getItem("User")) || null,
     loading: false,
     error: null,
     isSuccessful: false,
     isError: false,
     productCart: JSON.parse(localStorage.getItem("productCart")) || []
}

const reducer = (state = initialState, action) => {
     console.log(action);
     switch(action.type) {

          case "LOGIN_USER":
          case "REGISTER_USER":
               saveToLocalStorage("x-auth-token", action.token)
               localStorage.setItem("User", JSON.stringify(action.user))
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
               
          case "SIGN_OUT":{
               localStorage.removeItem("x-auth-token")
               localStorage.removeItem("productCart")
               localStorage.removeItem("User")
               return {
                    ...state,
                    token: null,
                    user: null,
               }
          }
               case "ADD_TO_CART": {
                    const isUserExist = state.productCart.find(product => product._id === action.product._id)
                    if(!isUserExist) {
                         saveToLocalStorage("productCart", [...state.productCart, action.product])
                         return {...state, productCart: [...state.productCart , action.product]}     
                    }
          }
          case "REMOVE_FROM_CART": {
               const newState =  state.productCart.filter((user) => user._id !== action.product._id)
               saveToLocalStorage("productCart", newState)
          return {...state, productCart: newState}
     }
          default: 
               return {
                    ...state
               }
          
     }
}
export default reducer