import { User } from "../models/User.js";
import { Course } from "../models/Course.js";
import { Enroll } from "../models/Enroll.js";

export const getDashboardStats = async (req, res) => {
  try {
    const [totalUsers, totalCourses, totalEnrollments, instructors] = await Promise.all([
      User.countDocuments(),
      Course.countDocuments(),
      Enroll.countDocuments(),
      User.countDocuments({ role: "instructor" }),
    ]);

    res.json({
      totalUsers,
      totalCourses,
      totalEnrollments,
      instructors,
      learners: totalUsers - instructors - 1, // exclude admin
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

export const getAllCoursesAdmin = async (req, res) => {
  try {
    const courses = await Course.find().populate("instructor", "name email");
    res.json(courses);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

export const deleteCourseAdmin = async (req, res) => {
  try {
    await Course.deleteOne({ _id: req.params.id });
    await Enroll.deleteMany({ course: req.params.id });
    res.json({ msg: "Course deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

export const getAllEnrollments = async (req, res) => {
  try {
    const enrollments = await Enroll.find()
      .populate("user", "name email")
      .populate("course", "title category")
      .sort({ enrolledAt: -1 }); // newest first

    res.json(enrollments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};
