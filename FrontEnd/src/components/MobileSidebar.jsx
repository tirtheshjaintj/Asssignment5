import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { FaHome, FaUsers, FaRegCompass, FaBook } from "react-icons/fa";
import { Link } from "react-router-dom";
export default function MobileSidebar() {
    return (
        <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
            <div className="offcanvas-header" style={{
                backgroundColor: "#035642"
            }}>
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div
                className="cursor-pointer d-flex w-100 flex-column justify-content-between text-white"
                style={{
                    backgroundColor: "#035642",
                    height: "100vh",
                }}
            >
                <div className="p-4">

                    <Link to={"/"}>
                        <img
                            src="https://cdn.pegasus.imarticus.org/images/imarticus-new-logo.svg"
                            alt="Logo"
                            width="160"
                            className="mx-auto d-block mb-8"
                        />
                    </Link>

                    <Link
                        to={"/user/dashboard"}
                        className="d-flex align-items-center p-3 mb-3 rounded-3"
                        style={{ backgroundColor: "#003F30", textDecoration: "none", color: "white" }}
                    >
                        <FaHome className="me-2" />
                        <span className="fw-bold">Dashboard</span>
                    </Link>
                    <Link
                        to={"/user/summarize"}
                        className="d-flex align-items-center p-3 mb-3 rounded-3"
                        style={{ backgroundColor: "#003F30", textDecoration: "none", color: "white" }}
                    >
                        <FaBook className="me-2" />
                        <span className="fw-bold">Summarizer</span>
                    </Link>
                    <div className="d-flex align-items-center px-3 py-2 mb-3">
                        <FaUsers className="me-2" />
                        <span>My Groups</span>
                    </div>

                    <div className="d-flex align-items-center px-3 py-2">
                        <FaRegCompass className="me-2" />
                        <span>Explore</span>
                    </div>
                </div>

                <div
                    className="p-3  border-top border-white "
                >
                    <small className="d-block mb-2">Facing problems?</small>
                    <button
                        className="btn text-white w-100 fw-bold"
                        style={{ backgroundColor: "#1E725A", borderRadius: "10px" }}
                    >
                        Get help
                    </button>
                </div>
            </div>
        </div>
    )
}
