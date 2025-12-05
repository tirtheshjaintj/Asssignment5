import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import { FaBell, FaUser, FaCog, FaSignOutAlt, FaBars, FaUsers, FaHome, FaRegCompass } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { addUser } from "../store/userSlice";
import Sidebar from "./Sidebar";
import MobileSidebar from "./MobileSidebar";

export default function Navbar({ title = "Dashboard" }) {
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();
    const cookie = new Cookies();
    const dispatch = useDispatch();

    const onLogout = () => {
        cookie.remove("user_token", { path: "/" });
        dispatch(addUser(null));
        navigate("/user/login");
    };

    return (
        <nav
            className="d-flex align-items-center justify-content-between px-3"
            style={{
                backgroundColor: "white",
                height: "8%",
                borderBottom: "2px solid rgba(0, 0, 0, 0.05)",
                padding: "10px",
                width: "100%"
            }}
        >
            <h6 className="fw-semibold m-0 d-none d-md-block">{title}</h6>
            <FaBars data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample"
                className="d-md-none text-xl" />

            <MobileSidebar />

            <div className="d-md-none position-absolute start-50 translate-middle-x">
                <img
                    src="https://cdn.pegasus.imarticus.org/images/imarticus-new-logo-green.svg"
                    alt="Logo"
                    style={{ height: "26px" }}
                />
            </div>

            <div className="d-flex align-items-center gap-3 ms-auto">

                <FaBell size={20} style={{ cursor: "pointer" }} />

                <div className="dropdown">
                    <div
                        className="d-flex align-items-center gap-2 dropdown-toggle"
                        data-bs-toggle="dropdown"
                        role="button"
                        style={{ cursor: "pointer" }}
                    >
                        <img
                            src="../user.png"
                            className="rounded-circle"
                            style={{ width: "30px", height: "30px", backgroundColor: "#E7EFF6" }}
                            alt="user"
                        />
                        <span className="fw-semibold d-none d-md-block">{user?.name || "User"}</span>
                    </div>

                    <ul className="dropdown-menu dropdown-menu-end shadow">
                        <li>
                            <button className="dropdown-item d-flex align-items-center gap-2">
                                <FaUser size={14} /> {user?.name || "User"}
                            </button>
                        </li>

                        <li>
                            <button className="dropdown-item d-flex align-items-center gap-2">
                                <FaCog size={14} /> Settings
                            </button>
                        </li>

                        <li><hr className="dropdown-divider" /></li>

                        <li>
                            <button
                                className="dropdown-item fw-semibold text-danger d-flex align-items-center gap-2"
                                onClick={onLogout}
                            >
                                <FaSignOutAlt size={14} /> Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
