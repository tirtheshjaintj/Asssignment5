// models/Course.js
const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    batch: { type: String, required: true },
    thumbnail: { type: String, required: true },
});

module.exports = mongoose.model("Course", CourseSchema);
