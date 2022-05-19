const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const PORT = 4000;
const DB_NAME = "Project"

require('dotenv').config();

// routes
var UserRouter = require("./routes/Users");
var GradeRouter = require("./routes/Grades");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connection to MongoDB
const uri = process.env.ATLAS_URI;
mongoose.connect(uri,{ useNewUrlParser: true }); 
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully!");
})

// setup API endpoints
app.use("/user", UserRouter);
app.use("/grade", GradeRouter);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
