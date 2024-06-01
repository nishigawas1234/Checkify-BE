const express = require("express");
const router = express.Router();
const getDataController = require("../controllers/getData.controller");

router.get("/getData", getDataController.getdata);


module.exports = router;
