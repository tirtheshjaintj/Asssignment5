const Course = require("../models/course.model");
const Lecture = require("../models/lecture.model");
const mongoose = require("mongoose");

// Get all courses with chapters + lectures
exports.getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find({});

        return res.json({ success: true, data: courses });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Get single course by ID with chapters + lectures
exports.getSingleCourse = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id))
            return res.status(400).json({ success: false, message: "Invalid course ID" });

        const course = await Course.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(id) } },
            {
                $lookup: {
                    from: "chapters",
                    localField: "_id",
                    foreignField: "course_id",
                    as: "chapters"
                }
            },
            {
                $lookup: {
                    from: "lectures",
                    localField: "_id",
                    foreignField: "course_id",
                    as: "lectures"
                }
            }
        ]);

        return res.json({ success: true, data: course[0] });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Get single lecture by ID
exports.getLectureById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id))
            return res.status(400).json({ success: false, message: "Invalid lecture ID" });

        const lecture = await Lecture.findById(id);

        if (!lecture)
            return res.status(404).json({ success: false, message: "Lecture not found" });

        return res.json({ success: true, data: lecture });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
