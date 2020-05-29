import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import actionTypes from "../types/productsActionType";

const initialAuthState = {
  list: [],
};

export default persistReducer(
    { storage, key: "react-product-list", whitelist: ["list"] },
    (state = initialAuthState, action = []) => {      
      switch (action.type) {        
        case actionTypes.SaveProduct:
          return {
            ...state,
            list: [...state.list, action.payload.data],
         };      
         case actionTypes.EditProduct:
          return {
            ...state,
            list:  state.list.map((element,index) =>
              index === action.payload.id ? action.payload.data : element
            )
         };    
         case actionTypes.DeleteProduct:
          return {
            ...state,
            list: state.list.filter((log ,index)  =>   index !== action.payload),           
          };        
        default:
          return state;
    }
  }
);
  