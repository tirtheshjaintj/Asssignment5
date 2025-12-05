const express = require("express");
const router = express.Router();
const courseController = require("../controllers/course.controller");

// GET all courses
router.get("/", courseController.getAllCourses);

// GET single course
router.get("/:id", courseController.getSingleCourse);

// GET lecture by ID
router.get("/lecture/:id", courseController.getLectureById);

module.exports = router;
