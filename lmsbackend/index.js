const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDb = require("./connection");
const User = require("./Models/UserModel");
const Course = require("./Models/CourseModel");
const Assignment = require("./Models/AssignmetModel");
const Submission = require("./Models/SubmissionModel");
const { sendWelcomeEmail } = require("./mailer");

dotenv.config();

const PORT = Number(process.env.PORT) || 3210;
const MONGODB_URI = process.env.MONGODB_URI;
const JWT_SECRET = process.env.JWT_SECRET;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:3000";
const SUPER_ADMIN_EMAIL = process.env.SUPER_ADMIN_EMAIL || "admin@jklms";
const SUPER_ADMIN_PASSWORD = process.env.SUPER_ADMIN_PASSWORD || "abc123";

if (!MONGODB_URI) {
  console.error("Missing MONGODB_URI in environment");
  process.exit(1);
}

if (!JWT_SECRET) {
  console.error("Missing JWT_SECRET in environment");
  process.exit(1);
}

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: CLIENT_ORIGIN.split(",").map((origin) => origin.trim()),
    credentials: true,
  })
);

const toObjectId = (value) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return null;
  }
  return new mongoose.Types.ObjectId(value);
};

const signToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
};

const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.auth = jwt.verify(token, JWT_SECRET);
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

const requireSuperAdmin = (req, res, next) => {
  if (req.auth?.role !== "SuperAdmin") {
    return res.status(403).json({ message: "Forbidden" });
  }
  return next();
};

app.get("/", (req, res) => {
  res.send("JK LMS API is running");
});

app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!["Teacher", "Student"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const exists = await User.findOne({ email: normalizedEmail });
    if (exists) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      role,
      approvalStatus: "Pending",
    });

    sendWelcomeEmail({
      toEmail: user.email,
      name: user.name,
      role: user.role,
    }).catch((error) => {
      console.error("Welcome email failed:", error.message);
    });

    return res.status(201).json({
      message: "Registration submitted. Wait for admin approval before login.",
      userId: user._id,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

app.post("/admin/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    if (email.trim().toLowerCase() !== SUPER_ADMIN_EMAIL.toLowerCase() || password !== SUPER_ADMIN_PASSWORD) {
      return res.status(401).json({ message: "Invalid admin credentials" });
    }

    const token = signToken({ role: "SuperAdmin", email: SUPER_ADMIN_EMAIL });
    return res.json({
      message: "Admin login successful",
      status: 200,
      role: "SuperAdmin",
      name: "Super Admin",
      token,
    });
  } catch (error) {
    return res.status(500).json({ message: "An error occurred during admin login" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Password incorrect" });
    }

    if (user.approvalStatus !== "Approved") {
      return res.status(403).json({
        message: "Your account is pending admin approval",
        status: 403,
      });
    }

    const token = signToken({ userId: user._id, role: user.role });

    return res.json({
      message: "Login successfully",
      status: 200,
      role: user.role,
      name: user.name,
      userId: user._id,
      token,
    });
  } catch (error) {
    return res.status(500).json({ message: "An error occurred during login" });
  }
});

app.get("/admin/pending-users", authenticate, requireSuperAdmin, async (req, res) => {
  try {
    const users = await User.find({ approvalStatus: "Pending" }, "name email role approvalStatus createdAt")
      .sort({ createdAt: -1 });
    return res.json(users);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

app.get("/admin/users", authenticate, requireSuperAdmin, async (req, res) => {
  try {
    const users = await User.find({}, "name email role approvalStatus approvedBy approvedAt createdAt")
      .sort({ createdAt: -1 });
    return res.json(users);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

app.put("/admin/users/:id/approve", authenticate, requireSuperAdmin, async (req, res) => {
  try {
    const userId = toObjectId(req.params.id);
    if (!userId) {
      return res.status(400).json({ message: "Invalid user id" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.approvalStatus = "Approved";
    user.approvedBy = req.auth.email || SUPER_ADMIN_EMAIL;
    user.approvedAt = new Date();
    await user.save();

    return res.json({ message: "User approved successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

app.delete("/admin/users/:id", authenticate, requireSuperAdmin, async (req, res) => {
  try {
    const userId = toObjectId(req.params.id);
    if (!userId) {
      return res.status(400).json({ message: "Invalid user id" });
    }

    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await Course.updateMany({}, { $pull: { enrolled_student_id: user._id } });
    await Submission.deleteMany({ student_id: user._id });

    return res.json({ message: "User removed successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

app.post("/addcourse", async (req, res) => {
  try {
    const { name, code, credithours, description } = req.body;
    if (!name || !code || !description) {
      return res.status(400).send("Name, code and description are required");
    }

    const course = await Course.create({
      name: name.trim(),
      code: code.trim().toUpperCase(),
      credithours: credithours?.trim() || "",
      description: description.trim(),
    });

    return res.status(201).json(course);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).send("Course code already exists");
    }
    return res.status(500).send("Something went wrong: " + error.message);
  }
});

app.get("/getcourse", async (req, res) => {
  const data = await Course.find().sort({ createdAt: -1 });
  res.send(data);
});

app.put("/updatecourse/:id", async (req, res) => {
  try {
    const courseId = req.params.id;
    const payload = { ...req.body };
    if (payload.code) {
      payload.code = String(payload.code).trim().toUpperCase();
    }

    const updatedCourse = await Course.findByIdAndUpdate(courseId, payload, {
      new: true,
      runValidators: true,
    });

    if (!updatedCourse) {
      return res.status(404).send("Course not found");
    }
    return res.send("Course updated successfully");
  } catch (err) {
    return res.status(500).send("Something went wrong: " + err.message);
  }
});

app.delete("/deletecourse/:id", async (req, res) => {
  try {
    const courseId = req.params.id;
    const deletedCourse = await Course.findByIdAndDelete(courseId);
    if (!deletedCourse) {
      return res.status(404).send("Course not found");
    }

    // Cascade cleanup of course assignments and submissions.
    const assignments = await Assignment.find({ course_id: deletedCourse._id }, "_id");
    const assignmentIds = assignments.map((item) => item._id);
    await Assignment.deleteMany({ course_id: deletedCourse._id });
    if (assignmentIds.length) {
      await Submission.deleteMany({ assignment_id: { $in: assignmentIds } });
    }

    return res.send("Course deleted successfully");
  } catch (err) {
    return res.status(500).send("Something went wrong: " + err.message);
  }
});

app.put("/enrollcourse/:id", async (req, res) => {
  try {
    const courseId = req.params.id;
    const studentId = toObjectId(req.body.studentId);

    if (!studentId) {
      return res.status(400).send("Invalid student id");
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).send("Course not found");
    }

    if (course.enrolled_student_id.some((id) => id.equals(studentId))) {
      return res.status(400).send("Student already enrolled in this course");
    }

    await Course.updateOne(
      { _id: courseId },
      { $push: { enrolled_student_id: studentId } }
    );

    return res.send("Student enrolled successfully");
  } catch (err) {
    return res.status(500).send("Something went wrong: " + err.message);
  }
});

app.get("/enrolledcourses/:studentId", async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const data = await Course.find({ enrolled_student_id: studentId });
    return res.send(data);
  } catch (err) {
    return res.status(500).send("Something went wrong: " + err.message);
  }
});

app.post("/addassignment", async (req, res) => {
  try {
    const { course_id, title, question, totalmarks, duedate } = req.body;

    if (!course_id || !title || !question || !totalmarks || !duedate) {
      return res.status(400).send("All fields are required");
    }

    const courseId = toObjectId(course_id);
    if (!courseId) {
      return res.status(400).send("Invalid course id");
    }

    const courseExists = await Course.findById(courseId);
    if (!courseExists) {
      return res.status(404).send("Course not found");
    }

    await Assignment.create({
      course_id: courseId,
      title: title.trim(),
      question: question.trim(),
      totalmarks: Number(totalmarks),
      duedate,
    });

    return res.send("Assignment added successfully");
  } catch (err) {
    return res.status(500).send("Something went wrong: " + err.message);
  }
});

app.get("/getassignment", async (req, res) => {
  const data = await Assignment.find().populate("course_id").sort({ createdAt: -1 });
  res.send(data);
});

app.get("/courseassgiment/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Assignment.find({ course_id: id }).sort({ createdAt: -1 });
    return res.send(data);
  } catch (error) {
    return res.status(500).send("Something went wrong: " + error.message);
  }
});

app.get("/studentassignments/:studentId", async (req, res) => {
  try {
    const studentId = toObjectId(req.params.studentId);
    if (!studentId) {
      return res.status(400).json({ error: "Invalid student id" });
    }

    const enrolledCourses = await Course.find({ enrolled_student_id: studentId }, "_id");
    const courseIds = enrolledCourses.map((course) => course._id);

    const assignments = await Assignment.find({ course_id: { $in: courseIds } }).populate(
      "course_id"
    );

    const submissions = await Submission.find({
      student_id: studentId,
      assignment_id: { $in: assignments.map((a) => a._id) },
    });

    const assignmentsWithSubmissions = assignments.map((assignment) => {
      const submission = submissions.find(
        (s) => s.assignment_id.toString() === assignment._id.toString()
      );
      return {
        ...assignment.toObject(),
        submission: submission || null,
      };
    });

    return res.json(assignmentsWithSubmissions);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.post("/submitassignment", async (req, res) => {
  try {
    const { assignment_id, student_id, answer } = req.body;

    if (!assignment_id || !student_id) {
      return res.status(400).json({ error: "assignment_id and student_id are required" });
    }

    const assignmentObjectId = toObjectId(assignment_id);
    const studentObjectId = toObjectId(student_id);

    if (!assignmentObjectId || !studentObjectId) {
      return res.status(400).json({ error: "Invalid assignment_id or student_id" });
    }

    let submission = await Submission.findOne({
      assignment_id: assignmentObjectId,
      student_id: studentObjectId,
    });

    if (submission) {
      submission.answer = answer || "";
      submission.submitted_date = new Date();
      submission.status = "Submitted";
      await submission.save();
    } else {
      submission = await Submission.create({
        assignment_id: assignmentObjectId,
        student_id: studentObjectId,
        answer: answer || "",
        submitted_date: new Date(),
        status: "Submitted",
      });
    }

    return res.json({ message: "Assignment submitted successfully", submission });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.get("/getsubmissions/:assignmentId", async (req, res) => {
  try {
    const assignmentId = toObjectId(req.params.assignmentId);
    if (!assignmentId) {
      return res.status(400).json({ error: "Invalid assignment id" });
    }

    const assignment = await Assignment.findById(assignmentId).populate("course_id");
    if (!assignment) {
      return res.status(404).json({ error: "Assignment not found" });
    }

    const submissions = await Submission.find({ assignment_id: assignmentId })
      .populate("student_id", "name email")
      .sort({ submitted_date: -1 });

    return res.json({ assignment, submissions });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.put("/gradesubmission/:submissionId", async (req, res) => {
  try {
    const submissionId = toObjectId(req.params.submissionId);
    const { obtainmarks, comments } = req.body;

    if (!submissionId) {
      return res.status(400).json({ error: "Invalid submission id" });
    }

    const submission = await Submission.findById(submissionId).populate("assignment_id", "totalmarks");
    if (!submission) {
      return res.status(404).json({ error: "Submission not found" });
    }

    const marks = Number(obtainmarks);
    if (Number.isNaN(marks) || marks < 0) {
      return res.status(400).json({ error: "Invalid marks" });
    }

    const maxMarks = submission.assignment_id?.totalmarks ?? marks;
    if (marks > maxMarks) {
      return res.status(400).json({ error: "Marks cannot exceed total marks" });
    }

    submission.obtainmarks = marks;
    submission.comments = comments || "";
    submission.status = "Checked";
    await submission.save();

    return res.json({ message: "Submission graded successfully", submission });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.get("/getallsubmissions", async (req, res) => {
  try {
    const submissions = await Submission.find()
      .populate("student_id", "name email")
      .populate({
        path: "assignment_id",
        populate: {
          path: "course_id",
          select: "code name",
        },
      })
      .sort({ submitted_date: -1 });

    return res.json(submissions);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.get("/studentsubmissions/:studentId", async (req, res) => {
  try {
    const studentId = toObjectId(req.params.studentId);
    if (!studentId) {
      return res.status(400).json({ error: "Invalid student id" });
    }

    const submissions = await Submission.find({ student_id: studentId })
      .populate({
        path: "assignment_id",
        populate: {
          path: "course_id",
          select: "code name",
        },
      })
      .sort({ submitted_date: -1 });

    return res.json(submissions);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

connectDb(MONGODB_URI).then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
