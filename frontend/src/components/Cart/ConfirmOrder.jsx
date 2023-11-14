import React, { Fragment } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector } from "react-redux";
import MetaData from "../layouts/MetaData";
import "./ConfirmOrder.css";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
const ConfirmOrder = () => {
    const navigate=useNavigate()
    const {carts,shippinginfo}=useSelector(state=>state.cart)
    console.log(shippinginfo, "carts")
    const {loginuser}=useSelector(state=>state.user)
    const user=loginuser?.data?.user
    console.log(user, "loginuser")


    const subtotal = carts.reduce(
        (acc, item) => acc + item.data.product.quantity * item.data.product.price,
        0
      );
    
      const shippingCharges = subtotal > 1000 ? 0 : 200;
    
      const tax = subtotal * 0.18;
    
      const totalPrice = subtotal + tax + shippingCharges;
    
      const address = `${shippinginfo[0].address}, ${shippinginfo[0].city}, ${shippinginfo[0].state}, ${shippinginfo[0].pinCode}, ${shippinginfo[0].country}`;
    
      const proceedToPayment = () => {
        const data = {
          subtotal,
          shippingCharges,
          tax,
          totalPrice,
        };
    
        sessionStorage.setItem("orderInfo", JSON.stringify(data));
    
        navigate("/process/payment");
      };
  return (
    <Fragment>
        <MetaData title={"Confirm Order"}/>
        <CheckoutSteps activeStep={1}/>
        <div className="confirmOrderPage">
        <div>
          <div className="confirmshippingArea">
            <Typography>Shipping Info</Typography>
            <div className="confirmshippingAreaBox">
              <div>
                <p>Name:</p>
                <span>{user.name}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{shippinginfo[0].phoneNo}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          <div className="confirmCartItems">
            <Typography>Your Cart Items:</Typography>
            <div className="confirmCartItemsContainer">
              {carts &&
                carts.map((item) => (
                  <div key={item.data._id}>
                    <img src={item.data.product.images[0].url} alt="Product" />
                    <Link to={`/product/${item.product}`}>
                      {item.data.product.name}
                    </Link>{" "}
                    <span>
                      {item.data.product.quantity} X ₹{item.data.product.price} ={" "}
                      <b>₹{item.data.product.price * item.data.product.quantity}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {/*  */}
        <div>
          <div className="orderSummary">
            <Typography>Order Summery</Typography>
            <div>
              <div>
                <p>Subtotal:</p>
                <span>₹{subtotal}</span>
              </div>
              <div>
                <p>Shipping Charges:</p>
                <span>₹{shippingCharges}</span>
              </div>
              <div>
                <p>GST:</p>
                <span>₹{tax}</span>
              </div>
            </div>

            <div className="orderSummaryTotal">
              <p>
                <b>Total:</b>
              </p>
              <span>₹{totalPrice}</span>
            </div>

            <button onClick={proceedToPayment}>Proceed To Payment</button>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default ConfirmOrder