import dotenv from 'dotenv';
dotenv.config()

import express from 'express';
import cors from 'cors';
import { createCourse, deleteInstructorCourse, getAllCourses, getCourseById, getCourseByInstructorId, updateCourse } from './controllers/courseController.js';
import { connectDb } from './config/DBConfig.js';
import { registerUser, userLogin } from './controllers/userController.js';
import { isAdmin, isAuthenticated, verifyUser } from './middleware/VerifyToken.js';
import { enrollCourse, enrolledCourses, unenrollCourse } from './controllers/enrollController.js';
import { deleteCourseAdmin, getAllCoursesAdmin, getAllEnrollments, getAllUsers, getDashboardStats } from './controllers/adminController.js';

const app=express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

// Admin Routes
app.get("/admin/stats", verifyUser, isAdmin, getDashboardStats);
app.get("/admin/users", verifyUser, isAdmin, getAllUsers);
app.get("/admin/courses", verifyUser, isAdmin, getAllCoursesAdmin);
app.get("/admin/enrollments", verifyUser, isAdmin, getAllEnrollments);
app.delete("/admin/course/:id", verifyUser, isAdmin, deleteCourseAdmin);

// open api's
app.get("/courses", getAllCourses);
app.post("/register", registerUser);
app.post("/login", userLogin);

//protected api's
app.get('/course/:id',verifyUser,getCourseById)
app.post('/addcourse',verifyUser,isAuthenticated,createCourse)
app.put('/course/:id',verifyUser,isAuthenticated,updateCourse);
app.delete('/course/instructor/:id',verifyUser,isAuthenticated,deleteInstructorCourse);
app.get('/instructor',verifyUser,isAuthenticated,getCourseByInstructorId)

// enrollment api's
app.get('/enroll/:id',verifyUser,enrollCourse);
app.get('/enrollments',verifyUser,enrolledCourses);
app.delete('/enroll/:id',verifyUser,unenrollCourse);

connectDb().then(() => {
  const PORT = process.env.PORT || 5600;
  app.listen(PORT, () => console.log(`Server running on ${PORT}`));
});