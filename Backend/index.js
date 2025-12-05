const cors = require('cors');
require('dotenv').config();
const express = require('express');
const test = require("./routes/test.route");
const app = express();
const connectDB = require('./helpers/db.helper');
const cookieParser = require('cookie-parser');
const user = require("./routes/user.route");
const course = require("./routes/course.route");
const razor = require("./routes/razor.route");
const ai = require("./routes/ai.route");
const { errorHandler } = require("./helpers/error.helper.js");

//MiddleWaress
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

const port = process.env.PORT || 5000;

//Testing Route
app.use("/", test);

//User Routes
app.use("/api/user", user);

//Course Routes
app.use("/api/course", course);

//Razor Routes
app.use("/api/razor", razor);

//AI Routes
app.use("/api/ai", ai);

//Error Handling
app.use(errorHandler);

connectDB()
    .then(async () => {
        console.log("DB connected");
        app.listen(port, () => {
            console.log(`Server started on port ${port}`);
        });
    })
    .catch((err) => console.error(err));
