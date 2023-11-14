import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
// import rootReducer from './reducers.js'; 
import productdetails from "./Features/Productslice.js";
import Userdetails from "./Features/UserSlice.js";
import Get_Product_Detail from "./Features/Productslice.js";
import cartdetails from "./Features/Cartslice.js";
import orderDetails from "./Features/Orderslice.js";
import getOrderDetails from "./Features/GetOrderSlice.js"

// console.log(productdetails.products)

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false
})
const store = configureStore({
  reducer: {
    app: productdetails,
    user: Userdetails,
    cart: cartdetails,
    neworder: orderDetails,
    Getorder: getOrderDetails,

  },

  middleware: customizedMiddleware


})

export default store;
