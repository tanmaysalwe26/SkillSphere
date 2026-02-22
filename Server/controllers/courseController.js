import mongoose from 'mongoose';
import { Course } from '../models/Course.js';
import { Enroll } from '../models/Enroll.js';

export const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find().populate("instructor", '_id name email');
        res.status(200).json(courses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }
}

export const createCourse = async (req, res) => {
    try {
        const course = new Course({ ...req.body, instructor: req.loggedInUser._id });
        await course.save();
        await course.populate("instructor", "_id name email");
        res.status(201).json(course);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ msg: "Course title already exists" });
        }
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }

}

export const updateCourse = async (req, res) => {
    const courseId = req.params.id;
    const newData = req.body;

    if (!mongoose.Types.ObjectId.isValid(courseId)) {
        return res.status(400).json({
            msg: 'Invalid Course ID format. Must be a 24-character hex string.'
        });
    }
    try {
        const course = await Course.findOne({ _id: courseId, instructor: req.loggedInUser._id });
        if (!course) return res.status(404).json({ msg: "Course not found or not owner" })

        const updatedcourse = await Course.findByIdAndUpdate(courseId, { $set: newData }, { new: true });

        console.log(updatedcourse);
        res.status(200).json({ msg: 'Course updated successfully', updatedcourse })
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ msg: "Course title already exists" });
        }
        console.error(error);
        res.status(500).json({ msg: "Something went wrong" });
    }
}

export const deleteInstructorCourse = async (req,res) => {
    try {
        const id=req.params.id;
        const course = await Course.findOneAndDelete({_id:id,instructor:req.loggedInUser._id});
        
        if(!course) return res.status(404).json({msg:"Course not found or not owner"});

        await Enroll.deleteMany({course:id});
        res.status(200).json({msg:"Deleted successfully"});
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Something went wrong" });
    }
}

export const getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id).populate(
            "instructor",
            "_id name email"
        );
        if (!course) return res.status(404).json({ msg: "Course not found" });
        res.status(200).json(course);
        console.log(course);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }
}

export const getCourseByInstructorId = async (req, res) => {
    try {
        const instructorId=req.loggedInUser._id.toString();
        const courses = await Course.find({ instructor: instructorId }).populate(
            "instructor",
            "_id name email"
        );
        //console.log(courses);
        res.status(200).json(courses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }
}
