import React, { Fragment, useState, useEffect } from 'react'
import { DataGrid } from "@material-ui/data-grid"
import "./MyOrders.css"
import { useSelector, useDispatch } from "react-redux";
import { Myorder } from "../../Features/GetOrderSlice.js"
import Loader from "../layouts/Loader/Loader.jsx";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import Typography from "@material-ui/core/Typography";
import MetaData from "../layouts/MetaData";
import LaunchIcon from "@material-ui/icons/Launch";

const MyOrders = () => {
    const dispatch = useDispatch();
    const alert = useAlert();

    const { loading, error, myorder } = useSelector((state) => state.Getorder)
    console.log(myorder, "myorders order")
    const { loginuser } = useSelector((state) => state.user)
    const user = loginuser?.data?.user
    console.log(loginuser, "login user")

    const columns = [
        { field: "id", headerName: "Order ID", minWidth: 300, flex: 0.5 },
        {
            field: "Status",
            headerName: "Status",
            minWidth: 150, flex: 0.3,
            cellClassName: (params) => {
                return params.getValue(params.id, "Status") === "Delivered"
                    ? "greenColor" :
                    "redColor"
            }
        },
        { field: "itemsQty", headerName: "Items Qty", type: "number", minWidth: 150, flex: 0.3 },
        { field: "amount", headerName: "amount", type: "number", minWidth: 270, flex: 0.3 },
        {
            field: "actions", flex: 0.3, headerName: "Actions", type: "number", sortable: false, minWidth: 150, renderCell: (params) => {
                return (
                    <Link to={`/order/${params.getValue(params.id, "id")}`}>
                        <LaunchIcon />
                    </Link>
                )
            }
        }
    ]
    const rows = []
    myorder && myorder.forEach((item, index) => {
        console.log(item.orderStatus, "foreact")
        rows.push({
            itemsQty: item.orderItems.length,
            id: item._id,
            Status: item.orderStatus,
            amount: item.totalPrice,
        });
    });
    console.log(rows)
    useEffect(() => {
        if (error) {
            alert(error)
        }
        dispatch(Myorder())

    }, [dispatch, error, alert])
    return (
        <Fragment>
            <MetaData title={`${user?.name} - Orders`} />
            {
                loading ? (<Loader />) : (
                    <div className="myOrdersPage">
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={10}
                            disableSelectionOnClick
                            className="myOrdersTable"
                            autoHeight
                        />

                        <Typography id="myOrdersHeading">{user?.name}'s Orders</Typography>
                    </div>
                )
            }

        </Fragment>
    )
}

export default MyOrders