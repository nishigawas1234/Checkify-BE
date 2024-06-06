const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors package
const app = express();

const getDataRoutes = require("./routes/getData.route");
const addDataRoutes = require("./routes/addData.route");
const userLogin = require("./routes/userLogin.route");

// Configure CORS
app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'] 
}));

app.use(bodyParser.json());

app.use("/", getDataRoutes);
app.use("/", addDataRoutes);
app.use("/", userLogin);

app.get("/", (req, res) => {
    res.json({ success: true });
});

module.exports = app;
