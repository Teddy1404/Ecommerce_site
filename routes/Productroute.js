const express = require("express");
const { getAllProducts, createProduct, updateProduct,deleteProduct, productDetails } = require("../controller/productcontroller");
const { isAuthenticatedUser, authorizeRoles} = require("../middleware/auth");

const router = express.Router();

router.route('/products').get(isAuthenticatedUser,authorizeRoles, getAllProducts);
router.route('/product/new').post(isAuthenticatedUser,createProduct);
router.route('/product/:id').put(isAuthenticatedUser,updateProduct).delete(isAuthenticatedUser,deleteProduct).get(productDetails);
module.exports = router