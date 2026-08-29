const mongoose = require("mongoose");

const AssignmentSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  totalmarks: {
    type: Number,
    required: true,
  },
  duedate: {
    type: Date,
    required: true,
  },
  course_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Courses",
    required: true,
  },
  answer:{
    type: String,
    default : ""
  },
  submitted_date:{
     type: Date,
    default : null
  },
   obtainmarks: {
      type: Number,
      default : null
    },
    comments: {
      type: String,
      default : ""
    },
    status: {
      type: String,
      default : "Assigned"
    },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Assignments = mongoose.model("Assignments", AssignmentSchema);

module.exports = Assignments;
