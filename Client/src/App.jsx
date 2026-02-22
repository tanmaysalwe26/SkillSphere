import {  Routes, Route } from "react-router-dom";
import { Register } from "./components/Register.jsx";
import { Dashboard } from "./components/Dashboard.jsx";
import { Login } from "./components/Login.jsx";
import { AboutUs } from "./components/AboutUs.jsx";
import { Navigationbar } from "./components/Navigationbar.jsx";
import { CreateCourse } from "./components/CreateCourse.jsx";
import { StudentDashboard } from "./components/StudentDashboard";
import { Courses } from "./components/Courses";
import { Contact } from "./components/Contact";
import { ToastContainer } from "react-toastify";
import { MyCourses } from "./components/MyCourses.jsx";
import { AdminDashboard } from "./components/AdminDashboard.jsx";
import Footer from "./components/Footer.jsx";
import { UpdateCourseForm } from "./components/UpdateCourseForm.jsx";

function App() {
  return (
    <div>
      <Navigationbar />

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/Courses" element={<Courses />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={<Dashboard />} />
        <Route path="/settings" element={<Dashboard />} />
        <Route path="/my-courses" element={<MyCourses />} />
        <Route path="/create-course" element={<CreateCourse />} />
        <Route path="/edit-course/:id" element={<UpdateCourseForm />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>

      <Footer />
      <ToastContainer />
    </div>
  );
}

export default App;
