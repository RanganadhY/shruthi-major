const express=require("express");
const router=express.Router();

const donorControllers = require("../controllers/donorControllers")

router.get("/get-donors",donorControllers.getTotalDonors)
router.get("/get-requests",donorControllers.getDonationRequests)
router.get("/get-donation-details/:requestNumber",donorControllers.getDonationDetails)

router.post("/save-donation-details",donorControllers.saveDonationDetails)

module.exports= router;