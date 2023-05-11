const express = require("express")
const router = express.Router()
const adminControllers = require("../controllers/adminControllers")

router.get("/fetch-donation-requests",adminControllers.fetchDonationRequests)

router.post("/approve-request",adminControllers.approveRequest)

router.post("/cancel-request",adminControllers.rejectRequest);

module.exports = router;