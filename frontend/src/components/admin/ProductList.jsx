import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import { getAdminProducts, deleteProduct } from '../../Features/Productslice.js';

import { Link , useNavigate} from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layouts/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";

const ProductList = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const naviagte=useNavigate()
    
    const {loding,error,adminproduct}= useSelector((state)=>state.app)
    const {error:deleteerror, isdeleted, loading}=useSelector((state)=>state.app)
    const products=adminproduct?.data?.product
    console.log(products, "all admin product")

    // product delete handler
    const deleteProductHandler =(id)=>{
      console.log(id,"handle delete")
      dispatch(deleteProduct(id))
      naviagte("/admin/products")
    }

    const columns = [
        {field:"id" , headerName:"Product ID" ,minWidth:200 , flex:0.5 ,},
        {field: "name", headerName:"Name" ,minWidth:350 , flex:1 ,},
        {field: "stock", headerName:"Stock" ,type:"number" ,minWidth:150 , flex:0.3 ,},
        {field: "price", headerName:"Price",type:"number" ,minWidth:270 , flex:0.5 },
        {field: "actions", headerName:"Actions",type:"number" ,minWidth:150 , flex:0.3, sortable:false,renderCell:(params)=>{
            return (
                <Fragment>
                    <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
                        <EditIcon/>
                    </Link>
                    <Button onClick={()=>deleteProductHandler(params.getValue(params.id, "id"))}>
                    
                        <DeleteIcon/>
                    </Button>

                </Fragment>
            )
        } }
    ]

    const rows=[]

    products && products.forEach((item)=>{
      rows.push({
        id:item?._id,
        stock:item?.Stock,
        name:item?.name,
        price:item?.price


      })
    })
  
    useEffect(() => {
        if(deleteerror){
          alert.error(deleteerror)
        }

        if(isdeleted){
          alert.success("product delete successfully")
        }
        dispatch(getAdminProducts())

    }, [dispatch, alert ,error])
    
  return (
    <Fragment>
      <MetaData title={`ALL PRODUCTS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL PRODUCTS</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  )
}

export default ProductList