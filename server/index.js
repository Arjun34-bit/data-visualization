const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const dashboardRoutes = require("./routes/dashboardRoutes");

const connectDB = require("./dbConfig/connectDB");

const app = express();
dotenv.config();
app.use(cors({ origin: "https://quizathon-front-end.onrender.com" }));
connectDB();
app.use(express.json());

app.use("/api/quiz/", dashboardRoutes);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(`Server is now running on PORT ${PORT}`)
);
