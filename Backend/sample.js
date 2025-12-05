// seed.js
const mongoose = require("mongoose");
const Course = require("./models/Course");
const Chapter = require("./models/Chapter");
const Lecture = require("./models/Lecture");

async function seed() {
    await mongoose.connect("mongodb://localhost:27017/learningDB");

    //console.log("DB connected");

    // 1. Create course
    const course = await Course.create({
        title: "Introduction to Machine Learning",
        batch: "2025",
        thumbnail: "https://shiftasia.com/community/content/images/2025/06/ml.png"
    });

    //console.log("Course created");

    // 2. Create chapters
    const chapters = await Chapter.insertMany([
        { course_id: course._id, title: "What is Machine Learning?" },
        { course_id: course._id, title: "Supervised Learning Basics" },
        { course_id: course._id, title: "Unsupervised Learning Basics" }
    ]);

    //console.log("Chapters created");

    // 3. Create demo lectures (YouTube links)
    const lectures = [
        {
            course_id: course._id,
            chapter_id: chapters[0]._id,
            video_link: "https://www.youtube.com/watch?v=ukzFI9rgwfU"
        },
        {
            course_id: course._id,
            chapter_id: chapters[1]._id,
            video_link: "https://www.youtube.com/watch?v=Y6RRHw9uN9o"
        },
        {
            course_id: course._id,
            chapter_id: chapters[2]._id,
            video_link: "https://www.youtube.com/watch?v=HkdAHXoRtos"
        }
    ];

    await Lecture.insertMany(lectures);

    //console.log("Lectures added!");

    mongoose.connection.close();
    //console.log("Seeding complete & DB closed");
}

seed();
