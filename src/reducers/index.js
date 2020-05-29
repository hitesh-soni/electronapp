import { combineReducers } from "redux";
import users from "./userReducer";
import products from "./productsReducer";

export default combineReducers({
  users,
  products
});
