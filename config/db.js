const mongoose = require("mongoose");

mongoose.set('strictQuery', false);
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI);
  } catch (error) {
    console.error(error);
  }
};

module.exports = connectDB;
