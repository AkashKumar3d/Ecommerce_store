import React, { Fragment, useState } from 'react'
import { useNavigate } from "react-router-dom";
import MetaData from "../layouts/MetaData"
import "./search.css"
const Search = () => {
    const [keyword ,setKeyword]=useState(" ")

    const history = useNavigate()
    const searchSubmitHandler=(e)=>{
        e.preventDefault();
        if (keyword.trim()) {
            history(`/products/${keyword}`)
            // history.push()
        }else{
            history(`/products/${keyword}`)
        }
    }
  return (
    <Fragment>
        <MetaData title="Search a Procuct --ECOMMERCE"/>
        <form className="searchBox" onSubmit={searchSubmitHandler}>
            <input type="text"  placeholder='Search a product...' onChange={(e)=>setKeyword(e.target.value)}/>
            <input type="submit" value={"Search"} />
        </form>
    </Fragment>
  )
}

export default Search