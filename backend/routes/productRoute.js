const express = require('express');
const {getAllProducts, createProduct, updateProduct, deleteProduct, getproductdetails, createproductreview, getProductReviews, deleteReview, getAdminProducts}=require('../controllers/productController.js');
const { IsAuthenticated, authorizedRole } = require('../middleware/isAuth.js');
const router = express.Router();

// default routes 
router.route("/products").get( getAllProducts)

// get admin all products 
router.route("/admin/products").get(IsAuthenticated, authorizedRole("Admin"), getAdminProducts)
// post routes
router.route("/admin/product/new").post(IsAuthenticated, authorizedRole("Admin"), createProduct)
// put and delete routes --admin
router.route("/admin/products/:id").put(IsAuthenticated, authorizedRole("Admin"),updateProduct).delete(IsAuthenticated, authorizedRole("Admin"),deleteProduct)
// delete routes --admin
router.route("/product/:id").get(getproductdetails)
router.route("/review").put(IsAuthenticated, createproductreview )
router.route("/reviews").get(getProductReviews).delete(IsAuthenticated, deleteReview)


module.exports = router