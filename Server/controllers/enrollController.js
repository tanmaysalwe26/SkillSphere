import { Course } from "../models/Course.js";
import { Enroll } from "../models/Enroll.js";

export const enrollCourse = async (req, res) => {
    try {
        const courseId = req.params.id;
        const userId = req.loggedInUser._id;

        const course = await Course.findById(courseId);
        if (!course) return res.status(404).json({msg:"Course is not available"});

        //send if user already enrolled
        const already = await Enroll.findOne({ user: userId, course: courseId });
        console.log(already);
        if (already) return res.status(400).json({ msg: "Already enrolled" });

        const enrollment = new Enroll({ user: userId, course: courseId });
        await enrollment.save();
        res.status(200).send({ msg: 'Enrolled successfully', enrollment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }
}

export const enrolledCourses = async (req,res) => {
    try {
        const enrolls = await Enroll.find({user:req.loggedInUser._id}).populate({path:'user',select:'_id name email'}).populate({
            path:'course',populate:{path:'instructor',select:'_id name email'}
        });
        console.log(enrolls);
        res.status(200).json(enrolls);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }
}

export const unenrollCourse = async (req,res) => {
    try {
        const result = await Enroll.deleteOne({user:req.loggedInUser._id,course:req.params.id});
        console.log(result);
        res.status(200).json({msg:"Unenrolled the course",result});
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }
}