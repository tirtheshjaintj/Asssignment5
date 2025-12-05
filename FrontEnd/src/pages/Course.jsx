import "bootstrap/dist/css/bootstrap.min.css";

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import CourseSkeleton from "../components/CourseSkeleton";
import { FaChevronDown, FaChevronUp, FaPlayCircle } from "react-icons/fa";
import axiosInstance from "../axios/axiosConfig";

export default function Course() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [openIndex, setOpenIndex] = useState(null);
    const [openVideo, setOpenVideo] = useState(null);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const res = await axiosInstance.get(`/course/${id}`);
                const courseData = res.data?.data;

                const chaptersWithLectures = courseData.chapters.map(ch => ({
                    ...ch,
                    lectures: courseData.lectures.filter(l => l.chapter_id === ch._id)
                }));

                setCourse({
                    ...courseData,
                    chapters: chaptersWithLectures
                });
            } catch (err) {
                navigate("/404");
            } finally {
                setLoading(false);
            }
        };

        fetchCourse();
    }, [id, navigate]);

    const toggleChapter = (i) => {
        setOpenIndex(openIndex === i ? null : i);
    };

    const closeVideo = () => setOpenVideo(null);

    return (
        <div className="d-flex">
            <Sidebar />

            <div className="d-flex flex-column" style={{ width: "100%" }}>
                <Navbar />

                <div className="container mt-4">

                    {loading ? (
                        <>
                            <CourseSkeleton />
                            <CourseSkeleton />
                        </>
                    ) : (
                        <>
                            <div className="p-4 shadow rounded bg-white mb-4 d-flex flex-col flex-md-row align-items-center gap-4">
                                <img
                                    src={course?.thumbnail}
                                    alt="Course Thumbnail"
                                    className="rounded"
                                    style={{ width: "300px", height: "300px", objectFit: "cover" }}
                                />

                                <div>
                                    <h3 className="fw-bold">{course?.title}</h3>
                                    <span className="badge bg-light text-dark px-3 py-2 mt-2">
                                        Batch: {course?.batch}
                                    </span>

                                    <p className="mt-3 fw-semibold">
                                        Status: <span className="text-success">Completed</span>
                                    </p>
                                </div>
                            </div>

                            <div className="bg-white rounded shadow p-0">
                                {course?.chapters?.map((chapter, index) => (
                                    <div key={index} className="border-bottom px-4 py-3">
                                        <div
                                            className="d-flex justify-content-between align-items-center cursor-pointer"
                                            onClick={() => toggleChapter(index)}
                                        >
                                            <div>
                                                <span className="fw-bold">
                                                    {index + 1}. {chapter.title}
                                                </span>

                                                <small className="d-block text-muted">
                                                    {chapter.lectures.length} Lecture
                                                    {chapter.lectures.length > 1 && "s"}
                                                </small>
                                            </div>

                                            {openIndex === index ? (
                                                <FaChevronUp />
                                            ) : (
                                                <FaChevronDown />
                                            )}
                                        </div>

                                        {openIndex === index && (
                                            <div className="mt-2 ps-4">
                                                {chapter.lectures.map((lec, lecIndex) => (
                                                    <div
                                                        key={lecIndex}
                                                        className="d-flex align-items-center py-2 cursor-pointer"
                                                        onClick={() => setOpenVideo(lec.video_link)}
                                                    >
                                                        <FaPlayCircle className="me-2 text-primary" />
                                                        <span>
                                                            Watch Lecture #{lecIndex + 1} "{lec.title}"
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>

            {openVideo && (
                <div
                    className="position-fixed top-0 start-0 vw-100 vh-100 bg-black bg-opacity-75 d-flex justify-content-center align-items-center"
                    style={{ zIndex: 2000, backdropFilter: "blur(4px)" }}
                    onClick={closeVideo}
                >
                    <div
                        className="bg-white p-3 rounded shadow-lg"
                        style={{
                            width: "90%",
                            maxWidth: "900px",
                            animation: "fadeIn 0.3s ease"
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="d-flex justify-content-between align-items-center mb-2">
                            <h5 className="fw-bold mb-0">Lecture Preview</h5>
                            <button className="btn btn-sm btn-dark" onClick={closeVideo}>✕</button>
                        </div>

                        <iframe
                            width="100%"
                            height="500"
                            src={openVideo.replace("watch?v=", "embed/")}
                            title="Lecture Video"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="rounded"
                        ></iframe>
                    </div>
                </div>
            )}
        </div>
    );
}
