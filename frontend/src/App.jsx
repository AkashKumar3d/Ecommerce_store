import React, { useState, useRef, useEffect } from 'react'
import './App.css'
import Hader from "./components/layouts/Hader/Hader.jsx";
import Footer from "./components/layouts/Foter/Footer.jsx";
import Home from "./components/Home/Home.jsx";
import ProductDetails from "./components/ProductDetails/ProductDetails.jsx";
import Products from "./components/Product/Products.jsx";
import Search from "./components/Product/Search.jsx";
import LoginSignUp from "./components/User/LoginSignUp.jsx"
import Profile from "./components/User/Profile.jsx";
import UpdteProfile from "./components/User/UpdteProfile.jsx"
import Cart from "./components/Cart/Cart.jsx";
import Shipping from "./components/Cart/Shipping.jsx";
import ConfirmOrder from "./components/Cart/ConfirmOrder";
import Payment from "./components/Cart/Payment";
import OrderStatus from "./components/Cart/OrderStatus";
import OrderDetails from "./components/Cart/OrderDetails.jsx";
import ProductList from "./components/admin/ProductList.jsx";
import Dashboard from "./components/admin/Dashboard.jsx";
import MyOrders from "./components/Order/MyOrders"
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WebFont from 'webfontloader';
// import Product from './components/Home/Product';
import { loadUser } from "./Features/UserSlice";
import UserOption from "./components/layouts/Hader/UserOption.jsx"
import ProtectedRoute from "./components/Route/ProtectedRoute";
import ProductDetails1 from './components/ProductDetails/ProductDetails1';
import axios from "axios"
import NewProduct from './components/admin/NewProduct';
import UpdateProduct from './components/admin/UpdateProduct.jsx';
import OrderList from './components/admin/OrderList.jsx';
import ProcessOrder from './components/admin/ProcessOrder';
import UsersList from './components/admin/UsersList';





function App() {

  const { loginuser, isAuthenticated, loading } = useSelector((state) => state.user)
  const [stripeapikey, setStripeapikey] = useState("")
  //  console.log(stripe)
  const getStripeApiKey = async () => {

    const data = await axios.get("http://localhost:4500/api/v1/stripeapikey", { withCredentials: true, })
    console.log(data, "datata")
    setStripeapikey(data.data.stripeApiKey)

  }

  console.log(loginuser, "userinfo")
  const dispatch = useDispatch()
  React.useEffect(() => {
    // dispatch(loadUser)
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"]
      }
    })
    dispatch(loadUser())
    getStripeApiKey()
  }, [])

  return (
    <>
      <Router>
        <Hader />

        {
          stripeapikey && (
            <Elements stripe={loadStripe(stripeapikey)}>

              {

                isAuthenticated && <Routes> <Route path="/process/payment" element={<Payment />} /></Routes>
              }
            </Elements>
          )
        }


        {isAuthenticated && <UserOption user={loginuser} />}

        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path='/product/:id' element={<ProductDetails />} />
          <Route path='/products' element={<Products />} />
          <Route path='/products/:keyword' element={<ProductDetails1 />} />
          {/* <Route exact path='/search' element={<Search />} /> */}
          <Route exact path='/search' element={<Search />} />
          <Route exact path="/Cart" element={<Cart />} />
          <Route exact path='/Login' element={<LoginSignUp />} />
          {

            isAuthenticated && <Route path="/account" element={isAuthenticated ? <Profile /> : <LoginSignUp />} />


          }
          {
            isAuthenticated && <Route path="/me/update" element={<UpdteProfile />} />

          }
          {
            isAuthenticated && <Route path="/login/shipping" element={<Shipping />} />
          }
          {
            isAuthenticated && <Route path="/order/confirm" element={<ConfirmOrder />} />
          }

          {
            isAuthenticated && <Route path="/success" element={<OrderStatus />} />
          }

          {
            isAuthenticated && <Route path="/orders" element={<MyOrders />} />
          }

          {
            isAuthenticated && <Route path="/order/:id" element={<OrderDetails />} />
          }

          {
            isAuthenticated && <Route path="/admin/dashboard" element={<Dashboard />} />
          }

          {
            isAuthenticated && <Route path="/admin/products" element={<ProductList />} />
          }

          {
            isAuthenticated && <Route path="/admin/product" element={<NewProduct />} />
          }

          {
            isAuthenticated && <Route path="/admin/product/:id" element={<UpdateProduct />} />
          }

          {
            isAuthenticated && <Route path="/admin/orders" element={<OrderList />} />
          }
          
          {
            isAuthenticated && <Route path="/admin/order/:id" element={<ProcessOrder/>} />
          }

{
            isAuthenticated && <Route path="/admin/users" element={<UsersList/>} />
          }



          {/* <Route path="/success" element={<OrderStatus />} /> */}
        </Routes>

        <Footer />
      </Router >
    </>
  )
}

export default App
