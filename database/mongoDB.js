const mongoose = require("mongoose");

const URI = process.env.MONGODB_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(URI, {
      user: process.env.MONGO_USR,
      pass: process.env.MONGO_PASS,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: process.env.DB_NAME,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
