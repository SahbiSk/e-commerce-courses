const express = require("express");
const router = express.Router();

const { singleCharge } = require("../controllers/stripeController");

router.post("/singlecharge", singleCharge);

module.exports = router;
