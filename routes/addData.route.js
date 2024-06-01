const express = require("express");
const router = express.Router();
const addDataController = require("../controllers/addData.controller");

router.post("/addData", addDataController.addData);
router.get("/addPerticularData/:id", addDataController.addPerticularData);
router.patch("/updateData/:id", addDataController.updateData);


module.exports = router;
