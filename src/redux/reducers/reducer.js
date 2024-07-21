const initialState = {
     token: null,
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
     }
}


export default reducer