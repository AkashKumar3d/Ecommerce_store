import React, { Fragment, useEffect } from 'react'
import "./Cart.css"
import CardItemCard from "./CardItemCard.jsx"
import { useSelector, useDispatch } from "react-redux";
import { Typography } from "@material-ui/core";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { Link, useNavigate } from "react-router-dom";
import { addtocart } from "../../Features/Cartslice"
import Loader from "../layouts/Loader/Loader"
import Meta from "../layouts/MetaData";
const Cart = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    // const {  } = useSelector((state) => { return state.cart })
    const { carts, loading, error } = useSelector((state) => state.cart);
    console.log(carts, "localhost")

    const increaseQuantity = (id, quantity, Stock) => {
        console.log(id, quantity, Stock, "ididid")
        //
        // console.log(id, quantity, stock,"increase")
        const newqty = quantity + 1
        if (Stock <= quantity) {
            return
        }

        dispatch(addtocart(id, newqty))
    }

    const decreaseQuantity = (id, quantity) => {
        const newqty = quantity - 1
        if (1 >= quantity) {
            return
        }
        dispatch(addtocart(id, newqty))
    }

    const chackoutHandler = () => {
        navigate("/login?redirect=shipping")
    }
    return (

        
        <Fragment>
            <Meta title={"Carts"} />
            {
                loading ? (<Loader/>):(<Fragment>
                    {
                        carts.length === 0 ? (
                            <div className="emptyCart">
                                <RemoveShoppingCartIcon />
        
                                <Typography>No Product in Your Cart</Typography>
                                <Link to="/products">View Products</Link>
                            </div>
                        ) : (
                            <Fragment>
                                <div className="cartPage">
                                    <div className="cartHeader">
                                        <p>Product</p>
                                        <p>Quantity</p>
                                        <p>Subtotal</p>
                                    </div>
                                    {
                                        carts && carts.map((item) => {
                                            console.log(item?.data?.product?._id, item?.data?.product?.quantity, item?.data?.product?.Stock, "all items")
                                            return (
                                                <div className="cartContainer">
                                                    <CardItemCard item={item} />
                                                    <div className="cartInput">
                                                        <button onClick={() => decreaseQuantity(item.data.product._id, item.data.product.quantity)}>-</button>
                                                        <input type="text" value={item.data.product.quantity} readOnly />
                                                        <button onClick={() => increaseQuantity(item.data.product._id, item.data.product.quantity, item.data.product.Stock)}>+</button>
                                                        {/* ,  */}
                                                    </div>
                                                    <p className='cartSubtotal'>{`₹${item.data.product.price * item.data.product.quantity}`}</p>
                                                </div>
                                            )
                                        })
                                    }
                                    <div className="cartGrossProfit">
                                        <div></div>
                                        <div className="cartGrossProfitBox">
                                            <p>Gross Total</p>
                                            <p>{`₹${carts.reduce((acc, item) => Number(item.data.product.quantity) * item.data.product.price)}`}</p>
                                        </div>
                                        <div></div>
                                        <div className="checkOutBtn">
                                            <button onClick={chackoutHandler}>Check Out </button>
                                        </div>
                                    </div>
                                </div>
                            </Fragment>)
                    }
                    </Fragment>)
            }
            
        </Fragment>
    )
}

export default Cart