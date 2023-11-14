import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layouts/MetaData";
import { Link, useParams } from "react-router-dom";
import { Button, Typography } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import SideBar from "./Sidebar";
import { getorderdetails } from "../../Features/GetOrderSlice"
import { UpdateOrder } from "../../Features/Orderslice"


import AccountTreeIcon from "@material-ui/icons/AccountTree";
import { useAlert } from "react-alert"
import Loader from "../layouts/Loader/Loader"
import "./processOrder.css";

const ProcessOrder = () => {
    const [status, setStatus] = useState("");
    const navigate = useNavigate()
    const { loding: updatedloading, error: updatederror, updateorder } = useSelector((state) => state.neworder)
    const { loading, error, getmyorder } = useSelector((state) => state.Getorder)
    console.log(getmyorder, "getmyorder")
    const order = getmyorder?.data?.order
    const dispatch = useDispatch()
    const alert = useAlert()
    const param = useParams()
    console.log(param.id, "idid")
    const id=param.id


    const updateOrderSubmitHandler = (e) => {
        e.preventDefault();
    console.log("updteb")
        const obj={
            "orderStatus":status
        }
      console.log(id, obj, "uocjchj")
        dispatch(UpdateOrder({id, obj}));
      };
    const proceedToPayment = () => {

    };
    useEffect(() => {
        if (error) {
            alert.error(error);
        }

        if(updatederror){
            alert.error(updatederror);
        }

        if(updateorder){
            alert.success("Order Updated Successfully");
        }

        dispatch(getorderdetails(param.id));
    }, [ alert, error]);
    return (
        <Fragment>
            <MetaData title="Process Order" />
            {
                loading ? (<Loader/>) :(<div className="dashboard">
                <SideBar />
                <div className="newProductContainer">
                    <div className="confirmOrderPage" style={{
                        display: order?.orderStatus === "Delivered" ? "block" : "grid",
                    }}>
                        <div>
                            <div className="confirmshippingArea">
                                <Typography>Shipping Info</Typography>
                                <div className="orderDetailsContainerBox">
                                    <div>
                                        <p>Name:</p>
                                        <span>{order?.user && order?.user?.name}</span>
                                    </div>
                                    <div>
                                        <p>Phone:</p>
                                        {order?.shippingInfo && order?.shippingInfo?.phoneNO}
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
                                                    order?.paymentInfo.status === "succeeded"
                                                    ? "greenColor"
                                                    : "redColor"
                                            }
                                        >
                                            {order?.paymentInfo &&
                                                order?.paymentInfo?.status === "succeeded"
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
                            <div className="confirmCartItems">
                                <Typography>Your Cart Items:</Typography>
                                <div className="confirmCartItemsContainer">
                                    {order?.orderItems &&
                                        order?.orderItems.map((item) => (
                                            <div key={item.product}>
                                                <img src={item.image} alt="Product" />
                                                <Link to={`/product/${item.product}`}>
                                                    {item.name}
                                                </Link>{" "}
                                                <span>
                                                    {item.quantity} X ₹{item.price} ={" "}
                                                    <b>₹{item.price * item.quantity}</b>
                                                </span>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>
                        {/*  */}
                        <div style={{
                            display: order?.orderStatus === "Delivered" ? "none" : "block",
                        }}>
                             <form
                  className="updateOrderForm"
                  onSubmit={updateOrderSubmitHandler}
                >
                  <h1>Process Order</h1>

                  <div>
                    <AccountTreeIcon />
                    <select onChange={(e) => setStatus(e.target.value)}>
                      <option value="">Choose Category</option>
                      {order?.orderStatus === "Processing" && (
                        <option value="Shipped">Shipped</option>
                      )}

                      {order?.orderStatus === "Shipped" && (
                        <option value="Delivered">Delivered</option>
                      )}
                    </select>
                  </div>

                  <Button
                    id="createProductBtn"
                    type="submit"
                    disabled={
                      loading ? true : false || status === "" ? true : false
                    }
                  >
                    Process
                  </Button>
                </form>
                        </div>
                    </div>

                </div>
            </div>)
            }
            
        </Fragment>
    )
}


export default ProcessOrder