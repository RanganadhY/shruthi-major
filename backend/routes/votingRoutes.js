const express = require("express")
const router = express.Router()

const votingControllers = require("../controllers/votingControllers")

router.get("/user-eligibility/:userName/:requestNumber",votingControllers.userElibility)
router.post("/cast-yes",votingControllers.castYes)
router.post("/cast-no",votingControllers.castNo)

module.exports = router;