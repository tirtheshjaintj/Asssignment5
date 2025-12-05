import "bootstrap/dist/css/bootstrap.min.css";
import Topbar from "../components/Topbar";
import Hero from "../components/Hero";
import Details from "../components/Details";
import CTA from "../components/CTA";

export default function Home() {
    return (
        <>
            <Topbar />
            <Hero />
            <Details />
            <CTA />
            <div className="d-flex fixed bottom-0 justify-content-center py-2" style={{ backgroundColor: "#cde8e1", width: "100%" }}>
                <button className="btn w-md-50 py-3 fw-semibold" style={{ backgroundColor: "#1D2738", color: "white" }}>
                    Download Brochure
                </button>
            </div>
            <div className="d-flex w-100 pb-60 justify-content-center" style={{
                backgroundColor: "#035642",
            }}>
                <img className="p-10" src="https://webcdn.imarticus.org/INET/Group1000002813.png" alt="" />
            </div>

        </>
    )
}
