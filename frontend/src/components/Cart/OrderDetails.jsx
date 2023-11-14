import React, { Fragment, useEffect } from "react";
import "./orderDetails.css";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layouts/MetaData";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
// import { getOrderDetails, clearErrors } from "../../actions/orderAction";
import {getorderdetails} from "../../Features/GetOrderSlice"
import Loader from "../layouts/Loader/Loader";
import { useAlert } from "react-alert";
import { useParams } from "react-router-dom";

const OrderDetails = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const {id}=useParams()
    console.log(id)

    const {loading , error, getmyorder}= useSelector((state)=>state.Getorder)
    console.log(getmyorder?.data?.order        ,"getmyordergetmyordergetmyordergetmyorder")
    const order= getmyorder?.data?.order  
    // const 

    useEffect(() => {
        if (error) {
          alert.error(error);
        }
    
        dispatch(getorderdetails({id}));
      }, [dispatch, alert, error, id]);
  return (
    <Fragment>
    {loading ? (
      <Loader />
    ) : (
       
      <Fragment>
        <MetaData title="Order Details" />
        <div className="orderDetailsPage">
          <div className="orderDetailsContainer">
            <Typography component="h1">
              Order #{order && order._id}
            </Typography>
            <Typography>Shipping Info</Typography>
            <div className="orderDetailsContainerBox">
              <div>
                <p>Name:</p>
                <span>{order?.user && order?.user?.name}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>
                  {order?.shippingInfo && order?.shippingInfo?.phoneNO}
                </span>
              </div>
              <div>
                <p>Address:</p>
                <span>
                  {order?.shippingInfo &&
                    `${order?.shippingInfo?.address}, ${order?.shippingInfo?.city}, ${order?.shippingInfo?.state}, ${order?.shippingInfo?.pincode}, ${order?.shippingInfo?.country}`}
                </span>
              </div>
            </div>
            <Typography>Payment</Typography>
            <div className="orderDetailsContainerBox">
              <div>
                <p
                  className={
                    order?.paymentInfo &&
                    order?.paymentInfo?.status === "sucess"
                      ? "greenColor"
                      : "redColor"
                  }
                >
                  {order?.paymentInfo &&
                  order?.paymentInfo?.status === "sucess"
                    ? "PAID"
                    : "NOT PAID"}
                </p>
              </div>

              <div>
                <p>Amount:</p>
                <span>{order?.totalPrice && order?.totalPrice}</span>
              </div>
            </div>

            <Typography>Order Status</Typography>
            <div className="orderDetailsContainerBox">
              <div>
                <p
                  className={
                    order?.orderStatus && order?.orderStatus === "Delivered"
                      ? "greenColor"
                      : "redColor"
                  }
                >
                  {order?.orderStatus && order?.orderStatus}
                </p>
              </div>
            </div>
          </div>

          <div className="orderDetailsCartItems">
            <Typography>Order Items:</Typography>
            <div className="orderDetailsCartItemsContainer">
              {order?.orderItems &&
                order?.orderItems.map((item) => (
                  <div key={item?._id}>
                    <img src={item?.image} alt="Product" />
                    <Link to={`/product/${item?.product}`}>
                      {item?.name}
                    </Link>{" "}
                    <span>
                      {item?.quantity} X ₹{item?.price} ={" "}
                      <b>₹{item?.price * item?.quantity}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </Fragment>
    )}
  </Fragment>
  )
}

export default OrderDetails