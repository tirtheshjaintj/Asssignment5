import { useEffect, useState } from "react";
import pdfToText from "react-pdftotext";
import { FaCloudUploadAlt, FaExclamationTriangle } from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import axiosInstance from "../axios/axiosConfig";
import toast from "react-hot-toast";

function Summarizer() {
    const [text, setText] = useState("");
    const [error, setError] = useState("");
    const [summary, setSummary] = useState("");
    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState(null);
    const [title, setTitle] = useState("");

    useEffect(() => {
        return () => {
            if (preview && typeof preview === "string") URL.revokeObjectURL(preview);
        };
    }, [preview]);

    const resetStates = () => {
        setPreview(null);
        setSummary("");
        setTitle("");
        setText("");
    };

    const throwError = (msg) => {
        resetStates();
        setError(msg);
        toast.error(msg);
        setLoading(false);
    };

    const summarizeText = async (inputText) => {
        try {
            const response = await axiosInstance.post("/ai/summarize", { prompt: inputText });

            if (response.data.status) {
                setTitle(response.data.title?.trim());
                setSummary(response.data.summary.replaceAll("*", "").trim());
                toast.success("Summary Generated Successfully");
            } else {
                throwError(response.data.message);
            }
        } catch {
            throwError("Error summarizing text.");
        } finally {
            setLoading(false);
        }
    };

    const handlePdf = async (file) => {
        try {
            const extracted = await pdfToText(file);
            setText(extracted);
            summarizeText(extracted);
        } catch {
            throwError("Failed to read PDF. Try another file.");
        }
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        resetStates();
        setLoading(true);

        // 📌 PDF Only restriction
        if (file.type !== "application/pdf") {
            throwError("Only PDF files are allowed.");
            return;
        }

        setPreview(URL.createObjectURL(file));
        handlePdf(file);
    };

    return (
        <div className="d-flex">
            <Sidebar />

            <div className="d-flex flex-column" style={{ width: "100%" }}>
                <Navbar />

                <div className="bg-light min-vh-100 py-5">
                    <div className="container text-center">
                        <label
                            htmlFor="file"
                            className="card shadow p-4 mx-auto"
                            style={{ maxWidth: "800px", cursor: "pointer" }}
                        >
                            <div className="d-flex flex-column align-items-center rounded py-4 bg-white text-center">
                                <FaCloudUploadAlt className="fs-1 text-primary mb-3" />
                                <h5>Select PDF</h5>

                                <input
                                    id="file"
                                    type="file"
                                    className="form-control mt-3"
                                    accept="application/pdf"
                                    onChange={handleFileUpload}
                                />
                            </div>
                        </label>

                        {preview && !error && (
                            <div className="card shadow mt-4 p-3 mx-auto" style={{ maxWidth: "700px" }}>
                                <div className="p-5 bg-secondary text-white rounded">
                                    <FaCloudUploadAlt className="fs-3 mb-2" />
                                    PDF Uploaded Successfully
                                </div>
                            </div>
                        )}

                        {error && (
                            <div
                                className="alert alert-danger d-flex justify-content-between align-items-center mt-4 mx-auto"
                                style={{ maxWidth: "700px" }}
                            >
                                <span>
                                    <FaExclamationTriangle className="me-2" />
                                    {error}
                                </span>
                                <button
                                    className="btn btn-link"
                                    onClick={() => {
                                        setError("");
                                        resetStates();
                                    }}
                                >
                                    Try Again
                                </button>
                            </div>
                        )}

                        {loading && (
                            <div className="mt-4 text-center">
                                <div className="spinner-border text-primary"></div>
                                <p className="mt-2 fw-bold">Summarizing...</p>
                            </div>
                        )}

                        {summary && !error && (
                            <div className="card shadow p-4 mt-4 mx-auto" style={{ maxWidth: "800px" }}>
                                {title && <h2 className="text-primary fw-bold text-center">{title}</h2>}
                                <h4 className="fw-bold mt-3">Summary</h4>
                                <p className="fs-6 text-start">{summary}</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="pb-32"></div>
            </div>
        </div>
    );
}

export default Summarizer;
