const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const dashboardRoutes = require("./routes/dashboardRoutes");
const path = require("path");

const connectDB = require("./dbConfig/connectDB");

const app = express();
dotenv.config();
app.use(cors({ origin: "https://quizathon-front-end.onrender.com" }));

const __dirname1 = path.resolve();

// Serve static assets
// app.use(express.static(path.join(__dirname1, "/client/build")));

// // Fallback for all other routes (for React Router)
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname1, "client", "build", "index.html"));
// });

connectDB();
app.use(express.json());

app.use("/api/quiz/", dashboardRoutes);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(`Server is now running on PORT ${PORT}`)
);
