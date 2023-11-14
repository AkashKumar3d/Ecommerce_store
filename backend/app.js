 const express = require('express');
 const cookieParser = require('cookie-parser');
const errorMiddleware = require('./middleware/error');
const bodyParser= require('body-parser')
const fileUpload = require("express-fileupload")
const cors=require("cors")
const app = express();
const dotenv=require("dotenv")

// dotenv
dotenv.config({path:"backend/config/config.env"})
app.use(
    cors({
      
      origin: "http://localhost:5173",
      credentials: true
    })
  );
app.use(express());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true, limit:"50mb"}))
app.use(bodyParser.json({ limit:"50mb"}))

app.use(fileUpload())
// route import 
const product = require('./routes/productRoute')
const user= require('./routes/userroute')
const order= require("./routes/orderRoute")
const payment= require("./routes/PaymentRoute")



// incialising the all routes
app.use('/api/v1', product)
app.use('/api/v1', user)
app.use('/api/v1', order)
app.use('/api/v1', payment)
// app.use('/api/v1', temp)


// middleware from error use the app.js file 
app.use(errorMiddleware)

module.exports =  app