const express = require("express");
const bodyParser = require('body-parser')
const app = express();

const getDataRoutes = require("./routes/getData.route");
const addDataRoutes =require("./routes/addData.route")
app.use(bodyParser.json())
app.use("/", getDataRoutes);
app.use("/",addDataRoutes )
app.get("/", (req, res) => {
    res.json({ success: true });
});

module.exports = app;
