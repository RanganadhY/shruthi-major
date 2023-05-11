const express=require("express");
const router=express.Router();
const authController = require("../controllers/authController")

router.post("/donor-register",authController.donorRegisteration);
router.post("/donor-login",authController.donorLogin)

router.post("/recepient-register",authController.recepientRegistaration);
router.post("/recepient-login",authController.recepientLogin)

router.post("/admin-register",authController.adminRegestration);
router.post("/admin-login",authController.adminLogin);

module.exports = router;