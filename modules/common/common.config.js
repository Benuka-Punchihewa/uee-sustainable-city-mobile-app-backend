const mongoose = require("mongoose");

/**
 * connects to mongodb database
 */
const connectDB = async () => {
  mongoose.connect(process.env.MONGODB_URI);
};

module.exports = { connectDB };
