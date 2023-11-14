import React from 'react'
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { Rating } from "@material-ui/lab";

import { useParams } from 'react-router-dom';
const ProductCart1 = ({ product }) => {
  console.log(product, "cart2")
  // const options = {
  //     edit: false,
  //     color: "rgba(20,20,20, 0.1)",
  //     activeColor: "tomato",
  //     size: window.innerWidth < 600 ? 20 : 25,
  //     value: product.rating,
  //     isHalf: true,
  // }

  const options = {
    readOnly: true,
    size: "large",
    value: product.ratings,
    // isHalf: true,
    precision: 0.5
  }
  const param = useParams()
  console.log(product.images, "image url")
  return (
    <Link className='productCard' to={`${product._id}`}>
      <img src={product?.images[0]?.url} alt={product.name} />
      <p>{product.name}</p>
      <div>
        <Rating {...options} /> <span>({product.noofreviews})</span>
      </div>
      <span>{`₹${product.price}`}</span>
    </Link>
  )
}

export default ProductCart1