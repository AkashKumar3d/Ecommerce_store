const express = require("express")
const router = express.Router()
const { IsAuthenticated } = require("../middleware/isAuth")
const { processPayment, stripeApikey } = require("../controllers/PaymentsController")


router.route("/payment/process").post( processPayment)
router.route("/stripeapikey").get(IsAuthenticated, stripeApikey)

module.exports=router 