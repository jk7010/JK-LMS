const mongoose = require("mongoose");

const GradeSchema = mongoose.Schema({
  
 
  assignment_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AssignmentModel",
    required: true,
  },
  students_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserModel",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Grades = mongoose.model("Grades", GradeSchema);

module.exports = Grades;
