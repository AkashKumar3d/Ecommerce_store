import React, { Fragment, useEffect, useState, } from 'react'
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useDispatch, useSelector } from "react-redux";
import { Get_All_Product_Detail, newReview } from "../../Features/Productslice";
import { useParams } from 'react-router-dom';
import ReactStars from "react-rating-stars-component";
import { Rating } from "@material-ui/lab";
import ReviewCard from "./ReviewCard.jsx"
import Loader from "../layouts/Loader/Loader.jsx";
import MetaData from "../layouts/MetaData.jsx"
import { useAlert } from "react-alert";
import { addtocart } from '../../Features/Cartslice';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
// import { Rating } from "@material-ui/lab";

const ProductDetails1 = () => {
  const { keyword } = useParams();

  console.log(keyword, "currentproduct id");

  const dispatch = useDispatch()
  const alert = useAlert()
  const { product, loading, error, } = useSelector(state => state.app)
  console.log(product, "product detail")


  const options = {
   readOnly:true,
    // size: "large",
    value: product.ratings,
    // isHalf: true,
    precision:0.5
  }

  const [quantity, setquantity] = useState(1)
  const [open, setOpen] = useState(false)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")

  const addToCartHandler = () => {
    // console.log("card")
    dispatch(addtocart(keyword))
    alert.success("item added successfully")
  }
  const decreaseQuantity = () => {

    if (1 >= quantity) return;
    const qty = quantity - 1;
    setquantity(qty)
  }

  const increaseQuantity = () => {
    if (product.Stock <= quantity) return;
    const qty = quantity + 1
    setquantity(qty)
  }

  const submitReviewToggle = () => {
    console.log("toggle")
    open ? setOpen(false) : setOpen(true)
    console.log(open)
  }

  const reviewSubmitHandler = () => {
    const myFrom = new FormData()

    myFrom.set("rating", rating)
    myFrom.set("comment", comment)
    myFrom.set("productId", keyword)
    const obj = {
      "rating": rating,
      "comment": comment,
      "productId": keyword
    }
    console.log(obj, "before dispatch")
    dispatch(newReview(obj))
    //  window.location.reload()

  }
  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    if (keyword) {
      dispatch(Get_All_Product_Detail(keyword));
    }
  }, [dispatch, keyword, error, alert])

  return (
    <Fragment>
      {
        loading ? (<Loader />) : (<Fragment>
          <MetaData title={`${product.name} --ECOMMERCE`} />
          <div className="ProductDetails">
            <div>
              <Carousel>
                {
                  product.images && product.images.map((item, i) => (
                    <img className='CarouselImage' key={item.ur} src={item.url} alt={`${i} slide`} />
                  ))
                }
              </Carousel>
            </div>
            <div>
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>
              <div className="detailsBlock-2">
                <Rating {...options} />
                <span className="detailsBlock-2-span">
                  {" "}
                  ({product?.reviews?.length} Reviews)
                </span>
              </div>
              <div className="detailsBlock-3">
                <h1>{`₹${product.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>

                    <input readOnly type="number" value={quantity} />

                    <button onClick={increaseQuantity}>+</button>

                  </div>
                  <button
                    disabled={product.Stock < 1 ? true : false}
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                  </button>
                </div>

                <p>
                  Status:
                  <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                    {product.Stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>
              <div className="detailsBlock-4">
                Description : <p>{product.description}</p>
              </div>


              <button onClick={submitReviewToggle} className="submitReview">
                Submit Review
              </button>
            </div>
          </div>
          <h3 className="reviewsHeading">REVIEWS</h3>

          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">

                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">

                Submit
              </Button>
            </DialogActions>
          </Dialog>
          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews?.map((review) => (
                  <ReviewCard key={review?._id} review={review} />
                ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
        </Fragment>)
      }
    </Fragment>
  )
}

export default ProductDetails1