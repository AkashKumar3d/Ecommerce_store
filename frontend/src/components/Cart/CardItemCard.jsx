import React from 'react'
import "./CardItemCart.css"
import {Link  } from "react-router-dom";
const CardItemCard = ({item}) => {
  console.log(item ,"alll")
  return (
    <div className='CartItemCard'>
        <img src={item.data.product.images[0].url} alt="error" />
        <div>
            <Link to={`/product/${item.product}`}>{item.data.product.name}</Link>
            <span>{`Price:₹${item.data.product.price}`}</span>
            <p>Remove</p>
        </div>
    </div>
  )
}

export default CardItemCard