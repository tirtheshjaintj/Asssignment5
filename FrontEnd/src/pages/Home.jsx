import "bootstrap/dist/css/bootstrap.min.css";
import Topbar from "../components/Topbar";
import Hero from "../components/Hero";
import Details from "../components/Details";
import CTA from "../components/CTA";
import HighlightsSection from "../components/Highlight";
import FAQSection from "../components/FAQ";
import Brochure from "../components/Brochure";
import Footer from "../components/Footer";

export default function Home() {
    return (
        <>
            <Topbar />
            <Hero />
            <Details />
            <CTA />
            <HighlightsSection />
            <FAQSection />
            <Footer />
            <Brochure />


        </>
    )
}
