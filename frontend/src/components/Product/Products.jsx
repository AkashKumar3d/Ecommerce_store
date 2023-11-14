import React, { Fragment, useEffect, useState } from 'react'
import "./Product.css"
import { useDispatch, useSelector } from "react-redux";
import { getallproducts } from "../../Features/Productslice";
import Loader from "../layouts/Loader/Loader";
import ProductCard1 from "../Home/ProductCart1";
import { useParams } from "react-router-dom";
import Pagination from 'react-js-pagination';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import MetaData from "../layouts/MetaData.jsx"
import {useAlert} from "react-alert"
const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
];
const Products = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [price, setprice] = useState([0, 25000])
    const [category, setCategory] = useState("")
    const [ratings, setratings] = useState(0)
    const dispatch = useDispatch()
    const params = useParams()
    const alert =useAlert()

    // let products=[]
    // let loading =false
    // const data = useSelector((state)=>{
    //     return state.app
    // })
    console.log(params,"datadata")

    const { loading, products, error } = useSelector((state) => { return state.app })
    console.log(products, "all products")
    const resultPerPage = products?.data?.resultperpage
    const productcount = products?.data?.productcount
    const keyword = params.keyword

    const priceHandler = (newprice) => {
        console.log("priceHandler")
        setprice(newprice)
    }
    const setCurrentPageNo = (e) => {
        setCurrentPage(e)
    }


    
    useEffect(() => {
        if(error){
            alert.error(error)
        }
        dispatch(getallproducts({ keyword, currentPage, price, category, ratings }))
    }, [dispatch, keyword, currentPage, price, category, ratings, alert , error])

    return (
        <Fragment>
            {
                loading ? <Loader /> : <Fragment>
                    <MetaData title={"Products --ECOMMERCE"}/>
                    <h2 className='productsHeading'>Product</h2>
                    <div className="products">
                        {products && products?.data?.allProducts.map((product) => { return <ProductCard1 key={product._id} product={product} /> }
                        )
                        }
                    </div>

                    {
                        keyword && <div className="filterBox">
                            <Typography>Price</Typography>
                            <Slider
                                value={price}
                                onChange={priceHandler}
                                valueLabelDisplay='auto'
                                area-aria-labelledby='range-label'
                                min={0}
                                max={25000}
                            />

                            <Typography>Categories</Typography>
                            <ul className="categoryBox">
                                {
                                    categories.map((category) => (
                                        <li className="category-link" key={category} onClick={() => setCategory(category)}>{category}</li>
                                    ))
                                }
                            </ul>

                            <fieldset>
                                <Typography component="legend"> Rating Above</Typography>
                                <Slider
                                    value={ratings}
                                    onchange={(e, newrating) => {
                                        setratings(newrating)
                                    }}
                                    area-labelledby="continuous-slider"
                                    min={0}
                                    max={5}
                                    valueLabelDisplay="auto"
                                />


                            </fieldset>

                        </div>
                    }

                    {
                        resultPerPage < productcount && <div className="paginationBox">
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={resultPerPage}
                                totalItemsCount={productcount}
                                onChange={setCurrentPageNo}
                                nextPageText={"Next"}
                                prevPageText={"Prev"}
                                firstPageText={"1st"}
                                lastPageText={"last"}
                                itemClass='page-item'
                                linkClass='page-link'
                                activeClass='pageItemActive'
                                activeLinkClass='pageLinkActive'
                            />
                        </div>
                    }

                </Fragment>
            }
        </Fragment>
    )
}

export default Products