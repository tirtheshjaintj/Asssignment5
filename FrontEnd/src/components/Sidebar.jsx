import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaHome, FaUsers, FaRegCompass } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Sidebar() {
    return (
        <div
            className="d-none cursor-pointer d-md-flex flex-column justify-content-between text-white"
            style={{
                width: "20%",
                backgroundColor: "#035642",
                position: "sticky",
                top: 0,
                height: "100vh",
            }}
        >
            <div className="p-4">
                <img
                    src="https://cdn.pegasus.imarticus.org/images/imarticus-new-logo.svg"
                    alt="Logo"
                    width="160"
                    className="mx-auto d-block mb-8"
                />

                <Link
                    to={"/user/dashboard"}
                    className="d-flex align-items-center p-3 mb-3 rounded-3"
                    style={{ backgroundColor: "#003F30", textDecoration: "none", color: "white" }}
                >
                    <FaHome className="me-2" />
                    <span className="fw-bold">Dashboard</span>
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
    );
}
