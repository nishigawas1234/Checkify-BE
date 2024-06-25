const express = require("express");
const router = express.Router();
const taskController = require("../controllers/task.controller");

router.post("/task/addData/:user_id", taskController.addData);
router.get("/task/getData/:user_id", taskController.getData);


module.exports = router;
