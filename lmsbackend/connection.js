const mongoose = require("mongoose");

const connectDb = async (mongoUri) => {
  try {
    await mongoose.connect(mongoUri);
    console.log("database connected");
  } catch (error) {
    console.error("database not connected", error.message);
    process.exit(1);
  }
};

module.exports = connectDb;
