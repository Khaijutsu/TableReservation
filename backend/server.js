const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/auth");
const tablesRoute = require("./routes/tables");
const usersRoute = require("./routes/users");
const availabilityRoute = require("./routes/availabilityRoute");
const reservationRoute = require("./routes/reservationRoute");

const app = express();
dotenv.config();


// MongoDB
const connect = async () => {
  try {
    mongoose.connect(process.env.DATABASE_ACCESS, {
      useNewUrlParser: true,
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    throw err;
  }
}


const db = mongoose.connection;

// Middleware
app.use(express.json());
app.use(cors());
app.use(logger("dev"));
app.use(cookieParser());

// Routes
app.use("/auth", authRoute);
app.use("/tables", tablesRoute);
app.use("/users", usersRoute);
app.use("/availability", availabilityRoute);
app.use("/reserve", reservationRoute);


app.use((err,req,res,next) => {
  const errorStatus = err.status || 500
  const errorMessage = err.message || "Something went wrong"
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack
  })
})


db.on("disconnected", ()=> {
  console.log("mongoDB disconnected!");
});



app.listen(4000, ()=> {
  connect();
  console.log("Connected to backend");
});