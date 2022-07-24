import { combineReducers, createStore } from "@reduxjs/toolkit";
import counterReducer from "./slice/counterSlice";
import cart from "./slice/cart";

// assume that the counter slice will be combined with other slices
const reducer = combineReducers({
  counter: counterReducer,
  cart:cart
});

// create the store from the combined reducer
const store = createStore(reducer);

export default store;


