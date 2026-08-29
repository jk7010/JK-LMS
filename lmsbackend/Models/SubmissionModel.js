const mongoose = require("mongoose");

const SubmissionSchema = mongoose.Schema({
  assignment_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Assignments",
    required: true,
  },
  student_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  answer: {
    type: String,
    default: ""
  },
  submitted_date: {
    type: Date,
    default: null
  },
  status: {
    type: String,
    default: "Assigned"
  },
  obtainmarks: {
    type: Number,
    default: null
  },
  comments: {
    type: String,
    default: ""
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

SubmissionSchema.index({ assignment_id: 1, student_id: 1 }, { unique: true });

const Submissions = mongoose.model("Submissions", SubmissionSchema);

module.exports = Submissions;
