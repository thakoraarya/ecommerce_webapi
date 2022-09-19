const express = require("express");
const app = express()
const bodyParser = require('body-parser')
const mongoose = require("mongoose");
const dotenv = require("dotenv");
require("dotenv").config();
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");

app.use(express.json());
dotenv.config();

var MONGO_URL = process.env.MONGO_URL;
const connect = async() => {
    try {
        mongoose.connect(MONGO_URL)
            .then(() => console.log("DB Connection Successfull!"))
            .catch((err) => {
                console.log(err);
            });
    } catch (err) {
        console.log("Can not connect DataBase", err);
    }
}
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use(bodyParser.json({
    strict: false
}))
app.listen(process.env.PORT || 5500, () => {
    console.log("Backend server is running with port 5000!");
});
connect();