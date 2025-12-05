import "bootstrap/dist/css/bootstrap.min.css";
import {
    FaFacebookF,
    FaLinkedinIn,
    FaInstagram,
    FaYoutube,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
    return (
        <footer style={{ backgroundColor: "#004d42", color: "white" }} className="pt-5 pb-32">
            <div className="container">

                <div className="row align-items-center mb-4">

                    <div className="col-md-6 mb-3 mb-md-0">
                        <p className="fw-semibold">Follow us on</p>
                        <div className="d-flex gap-3 fs-5">
                            <FaFacebookF />
                            <FaXTwitter />
                            <FaLinkedinIn />
                            <FaInstagram />
                            <FaYoutube />
                        </div>
                    </div>

                    <div className="col-md-6 text-md-end">
                        <p className="fw-semibold">Download our app</p>
                        <div className="d-flex gap-2 justify-content-md-end">
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                                alt="Play Store"
                                height="40"
                                width="130"
                            />
                            <img
                                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                                alt="App Store"
                                height="40"
                                width="130"
                            />
                        </div>
                    </div>

                </div>

                <hr style={{ borderColor: "rgba(255,255,255,0.3)" }} />

                <div className="row align-items-center">
                    <div className="col-md-6 d-flex align-items-center mb-3 mb-md-0">
                        <img
                            src="https://webcdn.imarticus.org/INET/Group1000002813.png"
                            alt="Imarticus Logo"
                            height="40"
                        />
                    </div>

                    <div className="col-md-6 text-md-end small">
                        <a href="#" className="text-white me-3 text-decoration-none">
                            Terms & Conditions
                        </a>
                        |
                        <a href="#" className="text-white ms-3 text-decoration-none">
                            Privacy Policy
                        </a>
                        <p className="mt-2 mb-0">
                            © 2025 Imarticus Learning Pvt. Ltd. All rights reserved.
                        </p>
                    </div>

                </div>
            </div>
        </footer>
    );
}
