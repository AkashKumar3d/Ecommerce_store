import React, { Fragment, useEffect, useRef } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layouts/MetaData";
import { Typography } from "@material-ui/core";
import { useAlert } from "react-alert";
import {
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import "./payment.css";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import EventIcon from "@material-ui/icons/Event";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { CreateOrder } from "../../Features/Orderslice"
// import { createOrder, clearErrors } from "../../actions/orderAction";

const Payment = () => {
    const navigate = useNavigate()
    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));
    const alert = useAlert()
    const stripe = useStripe()
    const element = useElements()
    const payBtn = useRef(null)
    const dispatch = useDispatch()

    const { carts, shippinginfo } = useSelector(state => state.cart)
    const { loginuser } = useSelector(state => state.user)
    const { error } = useSelector(state => state.neworder)
    // const { error } = useState(state => state.newOrder)
    console.log(carts, "cart shipping")
    console.log(orderInfo, "orderinfojk")

    const PaymentData = {
        amount: Math.round(orderInfo.totalPrice * 100)
    }

    const order = {
        shippingInfo: shippinginfo,
        orderItems: carts[0].data.product,
        itemsPrice: orderInfo.subtotal,
        taxPrice: orderInfo.tax,
        shippingPrice: orderInfo.shippingCharges,
        totalPrice: orderInfo.totalPrice

    }

    console.log(order, "order")
    const submitHandler = async (e) => {
        e.preventDefault()
        payBtn.current.disabled = true;
        try {
            const config = {
                headers: {
                    "Content-type": "application/json"
                }
            }
            const { data } = await axios.post("http://localhost:4500/api/v1/payment/process", PaymentData, config);
            console.log(data, "data")
            const client_secret = data.client_secret
            if (!stripe || !element) return

            const result = await stripe.confirmCardPayment(client_secret, {
                payment_method: {
                    card: element.getElement(CardNumberElement),
                    billing_details: {
                        name: loginuser?.data?.user?.name,
                        email: loginuser?.data?.user?.email,
                        address: {
                            line1: shippinginfo[0].address,
                            city: shippinginfo[0].city,
                            state: shippinginfo[0].state,
                            postal_code: shippinginfo[0].pincode,
                            country: shippinginfo[0].country
                        }
                    }
                }
            })
            // console.log("second console")

            if (result.error) {
                payBtn.current.disabled = false;
                alert.error(result.error.message);
            } else {
                if (result.paymentIntent.status === "succeeded") {

                    order.paymentInfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status
                    }
                    console.log(order, "finalorder")
                    dispatch(CreateOrder({order}))
                    console.log("dispatch console")
                    navigate("/success")
                } else {
                    alert.error("there is some issue while processing payment")
                }
            }
        } catch (error) {
            payBtn.current.disabled = false;
            // alert.error(error.response.data.message);
        }
    }

    useEffect(() => {
        if (error) {
            alert.error(error)
        }
    }, [error, alert])

    return (
        <Fragment>
            <MetaData title="Payment" />
            <CheckoutSteps activeStep={2} />
            <div className="paymentContainer">
                <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
                    <Typography>Card Info</Typography>
                    <div>
                        <CreditCardIcon />
                        <CardNumberElement className="paymentInput" />
                    </div>
                    <div>
                        <EventIcon />
                        <CardExpiryElement className="paymentInput" />
                    </div>
                    <div>
                        <VpnKeyIcon />
                        <CardCvcElement className="paymentInput" />
                    </div>

                    <input
                        type="submit"
                        value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
                        ref={payBtn}
                        className="paymentFormBtn"
                    />
                </form>
            </div>
        </Fragment>
    )
}

export default Payment