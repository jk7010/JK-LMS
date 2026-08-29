const mongoose = require('mongoose');
const Course = require('./Models/CourseModel');
const dotenv = require('dotenv');
const connectDb = require('./connection');

dotenv.config();

(async () => {
  try {
    await connectDb(process.env.MONGODB_URI);
    await Course.updateMany(
      { credithours: { $exists: false } },
      { $set: { credithours: 'N/A' } }
    );
    console.log('Updated existing courses');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
