const express = require("express");
const router = express.Router();
const noteController = require("../controllers/notes.controller");

router.post("/note/addData/:user_id", noteController.addData);
router.get("/note/getData/:user_id", noteController.getData);


module.exports = router;
