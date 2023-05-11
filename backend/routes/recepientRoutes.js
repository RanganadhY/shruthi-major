const express=require("express");
const router=express.Router();

const recepientController = require("../controllers/recepientControllers");

router.post("/donation-request/:userName",recepientController.donationRequest);

router.get("/fetch-requests/:userName",recepientController.fetchUserRequests);


module.exports= router;