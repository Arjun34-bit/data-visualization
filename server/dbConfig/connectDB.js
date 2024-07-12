const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    if (connect) {
      console.log("Database Connected Successfully");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
