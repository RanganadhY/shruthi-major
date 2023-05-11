const express=require("express");
const router=express.Router();

const txControllers = require("../controllers/txControllers");

router.get("/get-txn-history/:userType/:userName",txControllers.getTxHistory);
router.post("/add-tx",txControllers.addTx);

module.exports = router