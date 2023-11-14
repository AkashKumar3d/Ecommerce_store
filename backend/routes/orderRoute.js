const express = require("express")
const router=express.Router()
const {newOrder, getSingleOrder, myorders, getallorders, updateorder, deleteOrder}=require("../controllers/OrderControler")
const {IsAuthenticated, authorizedRole}=require("../middleware/isAuth")

router.route("/order/new").post(IsAuthenticated, newOrder)
router.route("/order/:id").get(IsAuthenticated, getSingleOrder) 
router.route("/orders/me/").get(IsAuthenticated, myorders)//
router.route("/admin/orders").get(IsAuthenticated, authorizedRole("Admin"), getallorders)
router.route("/admin/order/:id").put(IsAuthenticated, authorizedRole("Admin"), updateorder).delete(IsAuthenticated, authorizedRole("Admin"), deleteOrder)



module.exports =router; 
