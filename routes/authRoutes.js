const express = require("express");
const router = express.Router();

const {
  signup,
  login,
  logout,
  checkUserCred,
} = require("../controllers/authControllers");

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);
router.get("/checkuser", checkUserCred);

module.exports = router;
