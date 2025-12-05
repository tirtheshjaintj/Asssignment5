import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";

export default function CTA() {
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();
    const handleClick = () => {
        if (!user) {
            navigate("/user/login");
        } else {
            navigate("/user/dashboard");
        }
    }
    return (
        <div className="container my-4 d-flex flex-column flex-md-row gap-3 justify-content-center  pb-10">
            <button onClick={handleClick} className="btn w-100 w-md-50 py-3 fw-semibold" style={{ backgroundColor: "#FF7645", color: "white" }}>
                Apply Now
            </button>
            <button className="btn w-100 w-md-50 py-3 fw-semibold" style={{ backgroundColor: "#1D2738", color: "white" }}>
                Download Brochure
            </button>
        </div>
    )
}
