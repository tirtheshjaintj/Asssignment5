import "bootstrap/dist/css/bootstrap.min.css";

export default function Brochure() {
    return (
        <div className="d-flex fixed bottom-0 justify-content-center py-2" style={{ backgroundColor: "#cde8e1", width: "100%" }}>
            <button className="btn w-md-50 py-3 fw-semibold" style={{ backgroundColor: "#1D2738", color: "white" }}>
                Download Brochure
            </button>
        </div>
    )
}
