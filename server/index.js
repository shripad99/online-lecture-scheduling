const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config()

const app = express();

app.use(express.json());
app.use(
    cors({
        origin: "*",
    })
);


mongoose.connect(process.env.CONNECTION_STRING)
    .then(() => {
        console.log('Database connected');
    }
)

const authRoute = require("./routes/auth");
const instructorRoute = require("./routes/instructors");
const courseRoute = require("./routes/courses");
const lecturesRoute = require("./routes/lectures");

app.use('/auth', authRoute);
app.use('/instructor', instructorRoute);
app.use('/course', courseRoute);
app.use('/lecture', lecturesRoute)


app.listen(3000);
console.log('Listening on port 3000');