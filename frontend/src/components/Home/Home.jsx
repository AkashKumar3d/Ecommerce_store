import React, { Fragment, useEffect, useState } from 'react'
import { CgMouse } from "react-icons/cg";
import "./Home.css"
import MetaData from "../layouts/MetaData";
import { useDispatch, useSelector } from 'react-redux';
import { getallproducts } from "../../Features/Productslice";
import { load } from 'webfontloader';
import Loader from '../layouts/Loader/Loader';
import { useAlert } from 'react-alert';
import ProductCard from './ProductCard.jsx';
const Home = () => {
    console.log("home console here ")
    const alert = useAlert()
    const dispatch = useDispatch();
//     let products=[]
// let loading =false
// let error =""

    const { products, loading, error } = useSelector((state) => { return state.app});
    console.log(products, "product")

  

    useEffect(  () => {
        if (error) {
            return alert.error(error.message)
        }
        dispatch(getallproducts())  

    }, [dispatch, error, alert])

    console.log(products, "allhome data")
    return (
        <Fragment>
            {
                loading ? (<Loader />) : (<Fragment>
                    <MetaData title="ECOMMERCE" />
                    <div className="banner">
                        <p>Welcome to Ecommerce</p>
                        <h1>FIND AMAIZING PRODUCT BELOW</h1>
                        <a href="#container">
                            <button>
                                scroll <CgMouse />
                            </button>
                        </a>
                    </div>
                    <h2 className='homeHeading'>Featured Product</h2>
                    <div className="container" id="container">
                        {products && products?.data?.allProducts.map((product) => { return (<ProductCard product={product} />) })}
                    </div>
                </Fragment>)
            }
        </Fragment>

    )
}

export default Home