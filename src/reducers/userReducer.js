import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import actionTypes from "../types/authActionType";

const initialAuthState = {
  users: [],
  isLoggedin: false,
};

export default persistReducer(
    { storage, key: "react-auth", whitelist: ["users", "isLoggedin"] },
    (state = initialAuthState, action = []) => {      
      switch (action.type) {        
        case actionTypes.Register:
          return {
            ...state,
            users: [...state.users, action.payload.data],
         };      
         case actionTypes.LoginUser:
          return {
            ...state,
            isLoggedin:  action.payload.login
         };            
        default:
          return state;
    }
  }
);
  