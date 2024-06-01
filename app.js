const express = require("express");
const bodyParser = require('body-parser')
const app = express();

const getDataRoutes = require("./routes/getData.route");
const addDataRoutes =require("./routes/addData.route")
const userLogin = require("./routes/userLogin.route")
app.use(bodyParser.json())
app.use("/", getDataRoutes);
app.use("/",addDataRoutes )
app.use("/",userLogin )
app.get("/", (req, res) => {
    res.json({ success: true });
});

module.exports = app;
