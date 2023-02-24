const Product = require("../models/ProductModel");
const ErrorHandler = require("../utils/errorhandler");

//create product-- admin
exports.createProduct = async(req,res,next)=>{
  try {
    const product = await Product.create(req.body);
    res.status(201).json({
        success:true,
        product
    })
  } catch (error) {
    console.log(error);
  }
}

// Get all product

exports.getAllProducts = async (req,res)=>{
  const products = await Product.find();
    res.status(209).json({
      success:true,
        products
    })


}

//product Details

exports.productDetails = async(req,res,next)=>{
  const product = await Product.findById(req.params.id);
  if(!product){
    return next(new ErrorHandler("Product not found", 404));
  }
res.status(200).json({
   success:true,
   product
  })
}

//update product
exports.updateProduct = async (req,res,next)=>{
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
}

//Delete Product
exports.deleteProduct = async (req,res,next)=>{
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
}