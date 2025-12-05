import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import CourseCard from "../../components/CourseCard";
import CourseSkeleton from "../../components/CourseSkeleton";
import axiosInstance from "../../axios/axiosConfig";
import { useNavigate } from "react-router-dom";

export default function User_Dashboard() {

    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const res = await axiosInstance.get("/course");
                setCourses(res.data?.data || []);
            } catch (err) {
                //console.log(err);
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, []);

    const handleCourse = (id) => {
        navigate(`/course/${id}`);
    }


    return (<>
        <div className="d-flex">
            <Sidebar />

            <div className="d-flex flex-column" style={{ width: "100%" }}>
                <Navbar />

                {loading ? <>
                    <CourseSkeleton />
                    <CourseSkeleton />
                    <CourseSkeleton />
                </> : <div className="d-flex flex-column mt-10 px-3 px-md-5">
                    <h5>Recent Activity</h5>

                    {courses.length > 0 && (
                        <CourseCard
                            title={courses[0].title}
                            batch={courses[0].batch}
                            progress={Math.floor(Math.random() * 100)}
                            thumbnail={courses[0].thumbnail}
                            onContinue={() => {
                                handleCourse(courses[0]._id);
                            }}
                        />
                    )}

                    <h5 className="mt-4">All Courses</h5>

                    {courses.slice(1).map((course, index) => (
                        <CourseCard
                            key={index}
                            title={course.title}
                            batch={course.batch}
                            progress={Math.floor(Math.random() * 100)}
                            thumbnail={course.thumbnail}
                            onContinue={() => {
                                handleCourse(course._id);
                            }}
                        />
                    ))}
                </div>}
            </div>
        </div>
    </>
    )
}
