import React,{useEffect} from 'react'
import { Typography } from "@material-ui/core";
import Sidebar from "./Sidebar.jsx"
import "./dashboard.css"
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import Productslice, { getAdminProducts } from '../../Features/Productslice.js';
import  {GetOrder} from "../../Features/Orderslice.js"
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from "chart.js"
import MetaData from "../layouts/MetaData";

ChartJS.register(ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  )
const Dashboard = () => {
   const dispatch =useDispatch()
  const {loding,  error, adminproduct}= useSelector((state)=>state.app)
  const {loading:orderloading, error:ordererror, getOrder} = useSelector((state)=>state.neworder)
  console.log(getOrder,"get Order")
 let product=adminproduct?.data?.product
  let  OutOfStock=0;

  product && product.forEach((item) => {
     if(item.Stock===0){
      OutOfStock += 1;
     }
  });
  useEffect(()=>{
    dispatch(getAdminProducts())
    dispatch(GetOrder())

  },[])
    const lineState = {
        labels: ["Initial Amount", "Amount Earned"],
        datasets: [
          {
            label: "TOTAL AMOUNT",
            backgroundColor: ["tomato"],
            hoverBackgroundColor: ["rgb(197, 72, 49)"],
            data: [0, 2000],
          },
        ],
      };


      const doughnutState = {
        labels: ["Out of Stock", "InStock"],
        datasets: [
          {
            backgroundColor: ["#00A6B4", "#6800B4"],
            hoverBackgroundColor: ["#4B5000", "#35014F"],
            data: [OutOfStock, product?.length-OutOfStock],
          },
        ],
      };

  return (
    <div className="dashboard">
      <MetaData title="Dashboard - Admin Panel" />
      <Sidebar />

      <div className="dashboardContainer">
        <Typography component="h1">Dashboard</Typography>

        <div className="dashboardSummary">
          <div>
            <p>
              Total Amount <br /> 

            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/admin/products">
              <p>Product</p>
              <p>{product?.length}</p>
          
            </Link>
            <Link to="/admin/orders">
              <p>Orders</p>
              <p>{getOrder?.data?.order?.length}</p>
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
              <p>25</p>
            </Link>
          </div>
        </div>

        <div className="lineChart">
          <Line data={lineState} />
        </div>

        <div className="doughnutChart">
          <Doughnut data={doughnutState} />
        </div>
      </div>
    </div>
  )
}

export default Dashboard