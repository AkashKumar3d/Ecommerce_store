import React from 'react'
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { useParams } from 'react-router-dom';
import { Rating } from "@material-ui/lab";

const ProductCard = ({ product }) => {


    const options = {
        readOnly: true,
        size: "large",
        value: product.ratings,
        // isHalf: true,
        precision: 0.5
    }
    const param = useParams()
    console.log(param.id, "parameter")
    // console.log(product, "all product")
    return (
        <Link className='productCard' to={`product/${product._id}`}>
            <img src={product.images[0].url} alt={product.name} />
            <p>{product.name}</p>
            <div>
                <Rating {...options} /> <span>({product.noofreviews})</span>
            </div>
            <span>{`₹${product.price}`}</span>
        </Link>
    )
}

export default ProductCard