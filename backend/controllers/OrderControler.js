const Order = require("../modals/OrderModel")
const Product = require("../modals/productmodal")
const ErrorHandler = require("../util/errorhandler")
const catchAsyncError = require("../middleware/catchAsyncError.js")

// create a new order 
exports.newOrder = catchAsyncError(async (req, res, next) => {
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    } = req.body

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id
    })

    res.status(201).json({
        success: true,
        order
    })
})

// get single order
exports.getSingleOrder = catchAsyncError(async (req, res, next) => {
    console.log(req.params.id, "singleuser")
    const order = await Order.findById(req.params.id).populate("user", "name email")
  console.log(order,"single user order")
    if (!order) {
        return next(new ErrorHandler("Order not found with this id ", 404))
    }
    res.status(200).json({
        sucess: true,
        order
    })
})


// get looged in user
exports.myorders = catchAsyncError(async (req, res, next) => {
    const orders = await Order.find({ user: req.user })
    res.status(200).json({
        sucess: true,
        orders
    })
})


// get all orders  in user
exports.getallorders = catchAsyncError(async (req, res, next) => {
    const order = await Order.find()
    let totalamount = 0
    order.forEach((order) => {
        totalamount += order.totalPrice
    })
    res.status(200).json({
        sucess: true,
        totalamount,
        order
    })
})


// update Order status 
exports.updateorder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id)

    if (!order) {
        return next(new ErrorHander("Order not found with this Id", 404));
      }
    
    if (order.orderStatus === "Delivered") {
        return next(new ErrorHandler("you are allready deliverd this order ", 400))
    }

     if (req.body.status === "Shipped") {
    order.orderItems.forEach(async (o) => {
      await updateStock(o.product, o.quantity);
    });
  }
  order.orderStatus = req.body.status;

  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }
    
    order.orderStatus = req.body.status

    if (req.body.status === "Delivered") {
        order.deliveredAt = Date.now()
    }

    await order.save({ validateBeforeSave: true });
    res.status(200).json({
        sucess: true,
        order
    })
})

async function updateStock(id, quantity) {
    const product = await Product.findById(id)
    product.Stock -= quantity
    await product.save({ validateBeforeSave: true })
}


// delete order
exports.deleteOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id)
      console.log(order, "order data")
    if (!order) {
        return next(new ErrorHandler("order is not found "))
    }

    await order.deleteOne()

    res.status(200).json({
        sucess: true
    })
})