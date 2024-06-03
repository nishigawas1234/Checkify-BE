const express = require("express");
const router = express.Router();
const user = require("../controllers/userLogin.controller");

router.post("/sign-up", user.userSignUp);
router.post("/login", user.userLogin);


module.exports = router;
