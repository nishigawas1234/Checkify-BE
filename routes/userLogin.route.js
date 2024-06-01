const express = require("express");
const router = express.Router();
const userLogin = require("../controllers/userLogin.controller");

router.post("/login", userLogin.userLogin);


module.exports = router;
