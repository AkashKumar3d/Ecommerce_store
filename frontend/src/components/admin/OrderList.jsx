import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { useSelector, useDispatch } from "react-redux";
import { Link , useNavigate} from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layouts/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import "./productList.css";

import { GetOrder,UpdateOrder, DeleteOrder } from '../../Features/Orderslice';


const OrderList = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const naviagte=useNavigate()
    const {loding,error,getOrder}= useSelector((state)=>state.neworder)
    const {error:deleteerror, isdeleted, loading}=useSelector((state)=>state.neworder)
    const orders=getOrder?.data?.order
   //  const products=adminproduct?.data?.product

    console.log(orders, "all admin product")

    // product delete handler
    const deleteOrderhandler =(id)=>{
      console.log(id,"handle delete")
      dispatch(DeleteOrder(id))
      naviagte("/admin/orders")
    }

    const columns = [
      { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },
  
      {
        field: "status",
        headerName: "Status",
        minWidth: 150,
        flex: 0.5,
        cellClassName: (params) => {
          return params.getValue(params.id, "status") === "Delivered"
            ? "greenColor"
            : "redColor";
        },
      },
      {
        field: "itemsQty",
        headerName: "Items Qty",
        type: "number",
        minWidth: 150,
        flex: 0.4,
      },
  
      {
        field: "amount",
        headerName: "Amount",
        type: "number",
        minWidth: 270,
        flex: 0.5,
      },
  
      {
        field: "actions",
        flex: 0.3,
        headerName: "Actions",
        minWidth: 150,
        type: "number",
        sortable: false,
        renderCell: (params) => {
         return (
            <Fragment>
              <Link to={`/admin/order/${params.getValue(params.id, "id")}`}>
                <EditIcon />
              </Link>
  
              <Button
                onClick={() =>
                  deleteOrderhandler(params.getValue(params.id, "id"))
                }
              >
                <DeleteIcon />
              </Button>
            </Fragment>
          );
        },
      },
    ];
  

    const rows=[]

    orders&& orders.forEach((item)=>{
      rows.push({
        id:item?._id,
        itemsQty:item?.orderItems.length,
        status:item?.orderStatus,
        amount:item?.totalPrice
      })
    })
  
    useEffect(() => {
        if(deleteerror){
          alert.error(deleteerror)
        }

        if(isdeleted){
          alert.success("product deleted successfully")
        }
        dispatch(GetOrder())

    }, [dispatch, alert ,error])
    
  return (
    <Fragment>
      <MetaData title={`ALL Orders - Admin`} />

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

export default OrderList