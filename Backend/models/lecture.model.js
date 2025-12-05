const mongoose = require("mongoose");

const LectureSchema = new mongoose.Schema({
    title: { type: String, required: true },
    course_id: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    chapter_id: { type: mongoose.Schema.Types.ObjectId, ref: "Chapter", required: true },
    video_link: { type: String, required: true }
});

module.exports = mongoose.model("Lecture", LectureSchema);