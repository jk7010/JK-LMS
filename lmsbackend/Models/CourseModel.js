const mongoose = require("mongoose");

const CourseSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  credithours: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  enrolled_student_id:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    default: [],
  }]
});

const Course = mongoose.model("Courses", CourseSchema);

module.exports = Course;
