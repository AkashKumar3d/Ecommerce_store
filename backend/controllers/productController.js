const Product = require("../modals/productmodal")
const { findByIdAndUpdate } = require("../modals/userModel")
const ApiFeature = require("../util/apifeatures")
const ErrorHandler = require("../util/errorhandler")
const catchAsyncError = require("../middleware/catchAsyncError.js")

// create product --- Admin only
exports.createProduct = catchAsyncError(async (req, res, next) => {

    req.body.user = req.user.id // adding the current user id in products at time created 
    const product = await Product.create(req.body)

    if (!product) {
        return next(new ErrorHandler("product not found", 404))
    }
    res.status(201).json({
        sucess: true,
        product
    })
})

// get all products 
exports.getAllProducts = catchAsyncError(async (req, res, next) => {
    // console.log(next(new ErrorHandler("this is my error", 500)))
    // return next(new ErrorHandler("this is my error", 500)) 
    const resultperpage = 8;
    const productcount = await Product.countDocuments()
    const apiFeatures = await new ApiFeature(Product.find(), req.query).search().filter().pagination(resultperpage)
    // 
    const allProducts = await apiFeatures.query
    //  console.log(allProducts, "all products")
    res.status(200).json({
        sucess: true,
        allProducts,
        productcount,
        resultperpage
    })

    if (!allProducts) {
        return next(new ErrorHandler("product not found", 500))
    }
})


// get all products -- admin 
exports.getAdminProducts = catchAsyncError(async (req, res, next) => {
    const product = await Product.find()

    res.status(200).json({
        sucess: true,
        product
    })

    if (!allProducts) {
        return next(new ErrorHandler("product not found", 500))
    }
})

// single product get here 
exports.getproductdetails = catchAsyncError(async (req, res, next) => {
    let product = await Product.findById(req.params.id)
    console.log(product)
    if (!product) {
        console.log("product not found")
        return next(new ErrorHandler("Product not found", 404))

    }
    console.log(product, "product")
    res.status(200).json({
        sucess: true,
        product
    })
})

// update all products 
exports.updateProduct = catchAsyncError(async (req, res, next) => {
    let product = await Product.findById(req.params.id);

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true, runValidator: true, useFindAndModify: true
    })
    res.status(200).json({
        success: true,
        product
    })

    if (!product) {
        return res.status(404).json({
            sucess: false,
            message: "product not found",
            error
        })
    }
})


// delete product
exports.deleteProduct = catchAsyncError(async (req, res, next) => {

    let product = await Product.findById(req.params.id)
    try {
        console.log(product, "delete product id")
        await product.deleteOne()
        res.status(200).json({
            sucess: true,
            message: "product delete successfully"
        })
    } catch (error) {
        if (!product) {
            return res.status(404).json({
                sucess: false,
                message: "product not found"
            })
        }
    }
})

// create new review and update the review
exports.createproductreview = catchAsyncError(async (req, res, next) => {

    const { rating, comment, productId } = req.body;
    console.log(productId, "reue")
    const review = {
        user: req.user.id,
        name: req.user.name,
        rating: Number(rating),
        comment
    }
    console.log(review, "input")
    const product = await Product.findById(productId);
    console.log(product, "review product")
    const isReviewed = product.reviews.find((rev) => rev.user.toString() === review.user.toString());
    //   console.log(isReviewed,"third review console")
    if (isReviewed) {
        product.reviews.forEach(rev => {
            if (rev.user.toString() === product.user.id.toString()) {
                (rev.rating = rating),
                    (rev.comment = comment)
            }
        });
    } else {
        product.reviews.push(review);
        product.noofreviews = product.reviews.length
    }

    let avg = 0
    product.reviews.forEach(rev => {
        avg += rev.rating
    })

    product.ratings = avg / product.reviews.length

    await product.save({ validateBeforeSave: false })

    res.status(200).json({
        success: true
    })
})


//  get all review of a product
exports.getProductReviews = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.id);
    console.log(product, "review")
    if (!product) {
        return next(new ErrorHandler(404, 'Product not found'))
    }

    res.status(200).json({
        sucess: true,
        reviews: product.reviews
    })
})


// delete review 
exports.deleteReview = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);
    console.log(product, "product")
    if (!product) {
        return next(new ErrorHandler(404, 'Product not found'))
    }
    const reviews = product.reviews.filter(
        (rev) => rev.id.toString() !== req.query.id.toString()
    );

    console.log(reviews, "all reviews")

    let avg = 0
    reviews.forEach(rev => {
        avg += rev.rating
    })

    console.log(avg, "average")
    const ratings = avg / reviews.length
    const numofReviews = reviews.length
    console.log(ratings, numofReviews, "rating")
    await Product.findByIdAndUpdate(req.query.productId, {
        reviews,
        ratings,
        numofReviews
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
    })
})
