const Product = require("../models/ProductModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const Apifeatures = require("../utils/apifeatures");
//create product-- admin
exports.createProduct = catchAsyncError(async(req,res,next)=>{
  req.body.user = req.user.id;
    const product = await Product.create(req.body);
    res.status(201).json({
        success:true,
        product
    })
});

// Get all product

exports.getAllProducts = catchAsyncError(async (req,res)=>{
const resultPerPage = 5;
const productCount = await Product.countDocuments();

const apifeature = new Apifeatures(Product.find(),req.query).search().filter().pagination(resultPerPage);
  const products = await apifeature.query;
    res.status(209).json({
      success:true,
        products
    })


});

//product Details

exports.productDetails = catchAsyncError(async(req,res,next)=>{
  const product = await Product.findById(req.params.id);
  if(!product){
    return next(new ErrorHandler("Product not found", 404));
  }
res.status(200).json({
   success:true,
   product,
   productCount,
  })
});

//update product
exports.updateProduct =catchAsyncError( async (req,res,next)=>{
  let product = await Product.findById(req.params.id);
  if(!product){
   return res.status(500).json({
     success:false,
     message:"Product not found"
   })
  }
 
  product = await Product.findByIdAndUpdate(req.params.id,req.body,{
   new:true,
   runValidators:true,
   useFindAndModify:false
  });
 
  res.status(200).json({
   success:true,
   product
  })
 });

//Delete Product
exports.deleteProduct = catchAsyncError(async (req,res,next)=>{
  let product = await Product.findById(req.params.id);
  if(!product){
   return res.status(500).json({
     success:false,
     message:"Product not found"
   })
  }
 
  await product.remove();

  res.status(200).json({
   success:true,
   message:"Product delete successfully"
  })
});