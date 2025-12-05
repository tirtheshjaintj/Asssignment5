import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function CourseCard({
    title,
    batch,
    progress,
    onContinue,
    thumbnail
}) {
    return (
        <div
            className="card border-0 shadow-sm p-3 my-3"
            style={{ borderRadius: "18px" }}
        >
            <div className="row align-items-center g-3">
                <div className="col-3 col-md-2">
                    <div
                        style={{
                            height: "140px",
                            borderRadius: "12px",
                            background: thumbnail
                                ? `url(${thumbnail}) center/cover`
                                : "linear-gradient(to right, #e6eef5, #dfe9f0)"
                        }}
                    ></div>
                </div>

                <div className="col-9 col-md-6">
                    <h6 className="fw-semibold mb-1">{title}</h6>

                    <span
                        className="badge bg-light text-dark rounded-pill mb-2 text-truncate"
                        style={{
                            fontSize: "12px",
                            maxWidth: "100%",
                            display: "inline-block"
                        }}
                    >
                        {batch}
                    </span>


                    <div className="d-flex align-items-center mt-2">
                        <div className="progress flex-grow-1" style={{ height: "6px" }}>
                            <div
                                className="progress-bar bg-success"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                        <small className="ms-2 text-muted">{progress}%</small>
                    </div>
                </div>

                <div className="col-12 col-md-4 text-end">
                    <button
                        className="btn btn-lg fw-semibold"
                        style={{
                            borderColor: "#035642",
                            color: "#035642",
                            borderRadius: "12px"
                        }}
                        onClick={onContinue}
                    >
                        Continue
                    </button>
                </div>
            </div>
        </div>
    );
}
