
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Home from "./Components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TeacherDashboard from "./Components/teacherdashboard";
import CreateCourses from "./Components/CreateCourses";
import CreateAssignment from "./Components/CreateAssignment";
import ViewCourses from "./Components/ViewCourses";
import ViewAssignment from "./Components/ViewAssignment";
import Gradeassignment from "./Components/Gradeassignment";
import CheckAssignment from "./Components/CheckAssignment";
import Studentdashboard from "./Components/Studentdashboard";
import AllCourses from "./Components/AllCourses";
import EnrolledCourses from "./Components/EnrolledCourses";
import StudentAssignments from "./Components/StudentAssignments";
import StudentGrades from "./Components/StudentGrades";
import {ToastContainer} from "react-toastify";
import ProtectedRoute from "./Components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/teacherdashboard" element={<ProtectedRoute allowedRoles={["Teacher"]}><TeacherDashboard /></ProtectedRoute>}></Route>
        <Route path="/studentdashboard" element={<ProtectedRoute allowedRoles={["Student"]}><Studentdashboard /></ProtectedRoute>}></Route>
        <Route path="/StudentGrades" element={<ProtectedRoute allowedRoles={["Student"]}><StudentGrades /></ProtectedRoute>}></Route>
        <Route path="/createcourses" element={<ProtectedRoute allowedRoles={["Teacher"]}><CreateCourses /></ProtectedRoute>}></Route>
        <Route path="/createassignment" element={<ProtectedRoute allowedRoles={["Teacher"]}><CreateAssignment /></ProtectedRoute>}></Route>
        <Route path="/viewcourses" element={<ProtectedRoute allowedRoles={["Teacher"]}><ViewCourses /></ProtectedRoute>}></Route>
        <Route path="/viewassignment" element={<ProtectedRoute allowedRoles={["Teacher"]}><ViewAssignment /></ProtectedRoute>}></Route>
        <Route path="/gradeassignment" element={<ProtectedRoute allowedRoles={["Teacher"]}><Gradeassignment /></ProtectedRoute>}></Route>
        <Route path="/gradeassignment/:assignmentId" element={<ProtectedRoute allowedRoles={["Teacher"]}><Gradeassignment /></ProtectedRoute>}></Route>
        <Route path="/checkassignment" element={<ProtectedRoute allowedRoles={["Teacher"]}><CheckAssignment /></ProtectedRoute>}></Route>
        <Route path="/checkassignment/:assignmentId" element={<ProtectedRoute allowedRoles={["Teacher"]}><CheckAssignment /></ProtectedRoute>}></Route>
         <Route path="/allcourses" element={<ProtectedRoute allowedRoles={["Student"]}><AllCourses /></ProtectedRoute>}></Route>
         <Route path="/enrolledcourses" element={<ProtectedRoute allowedRoles={["Student"]}><EnrolledCourses /></ProtectedRoute>}></Route>
         <Route path="/assignments" element={<ProtectedRoute allowedRoles={["Student"]}><StudentAssignments /></ProtectedRoute>}></Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
