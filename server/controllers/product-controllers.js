import Product from "../models/product-model.js"
import { ErrorHandler } from "../utils/errorHandler.js"
import { catchAsyncError } from "../middleware/catchAsyncError.js"
import { ApiFeatures } from "../utils/apiFeatures.js"

// Create Product-Admin

export const createProduct =catchAsyncError( async (req, res,next) => {

    req.body.userId = req.user.id               //if there is multiple admin or user who created this post. so other one can know. req.body.userId monggose m product m h to usme hum req.user.id daal rhe jo ki authanticated hone par use mil jyegi

    const product = await Product.create(req.body)
    res.status(201).json({
        success: true,
        product
    })
})

// Get all products
export const getAllProducts =catchAsyncError(async (req, res) => {
    const resultPerPage = 8
    const productsCount = await Product.countDocuments()
    const apiFeature= new ApiFeatures(Product.find(),req.query)
    .search().filter().pagination(resultPerPage);
    // const products = await Product.find()
    const products = await apiFeature.query;
    res.status(201).json({
        success: true,
        products,
        productsCount,
        resultPerPage
    })
})

//get Single product
export const getSingleProduct =catchAsyncError( async (req, res, next) => {
    const product = await Product.findById(req.params.id)
    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404))
    }
    res.status(201).json({
        success: true,
        product
    })
})
// update Product: Admin

export const updateProduct =catchAsyncError( async (req, res, next) => {
    let product = await Product.findById(req.params.id)
    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404))
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    res.status(200).json({
        success: true,
        message: "Product Updated",
        product
    })
})

// delete product :Admin

export const deleteProduct =catchAsyncError(async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id)
        if (!product) {
            return next(new ErrorHandler("Product Not Found", 404))
        }
        await product.deleteOne()
        res.status(200).json({
            success: true,
            message: "Product Deleted",
        })

    } catch (error) {
        console.log(error)
    }

})

// Create new Or update the review
export const createProductReview=catchAsyncError(async(req,res,next)=>{
    const {rating,comment,productId} = req.body
    const review={
        userId:req.user._id,
        name:req.user.name,
        rating: Number(rating),
        comment,
    }
    const product = await Product.findById(productId)
    const isReviewed = product.reviews.find(curReview=>curReview.userId.toString()===req.user._id.toString())
    if(isReviewed){
        product.reviews.forEach(rev=>{
            if(rev.userId.toString()===req.user_id.toString()){
                rev.rating=rating,
                rev.comment=comment
            }
        })
    }
    else{
        product.reviews.push(review)
        product.numOfReviews = product.reviews.length
    }
    let avg = 0;
    product.reviews.forEach(rev=>{                 //yha ratings monggose m overall average rating hai jo ki review m rating se diff h 
        avg += rev.rating
    })
    product.ratings = avg/product.reviews.length
    await product.save({validateBeforeSave:false})
    res.status(200).json({
        success:true,
    })
    
})

// get all reviews of a single product
export const getProductReviews = catchAsyncError(async(req,res,next)=>{
    const product = await Product.findById(req.query.productId)
    if(!product){
        return next(new ErrorHandler("Product Not Found", 404))
    }
    res.status(200).json({
        success:true,
        reviews:product.reviews
    })
})
//delete review
export const deleteReview =catchAsyncError(async(req,res,next)=>{
    const product = await Product.findById(req.query.productId)
    if(!product){
        return next(new ErrorHandler("Product Not Found", 404))
    }
    const reviews = product.reviews.filter(rev=>rev._id.toString() !== req.query.id)    //yaani isme saare reviews honge jo delete nhi karne
    let avg = 0;
    reviews.forEach(rev=>{                 //yha ratings monggose m overall average rating hai jo ki review m rating se diff h 
        avg += rev.rating
    })
    const ratings = avg/reviews.length
    const numOfReviews = reviews.length

    await Product.findByIdAndUpdate(req.query.productId,{
        reviews,ratings,numOfReviews
    },{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })

    res.status(200).json({
        success:true,
    })
})
