// db.js
const mongoose = require("mongoose");

async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected successfully...");
  } catch (err) {
    console.error(err);
  }
}

module.exports = connectToDatabase;
