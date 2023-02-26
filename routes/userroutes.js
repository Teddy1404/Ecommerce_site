const express = require("express");
const { registerUser } = require("../controller/Usercontroller");
const router = express.Router();

router.route("/register").post(registerUser);
module.exports = router;