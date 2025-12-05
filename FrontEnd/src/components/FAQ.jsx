import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

export default function FAQSection() {
    return (
        <section className="py-5 bg-light">
            <div className="container">
                <h3 className="text-center fw-bold">Still have Doubts?</h3>
                <p className="text-center text-muted mb-4">
                    We have answered some of the frequent questions for you!
                </p>

                <div className="accordion" id="faqAccordion" style={{ maxWidth: "900px", margin: "0 auto" }}>

                    <div className="accordion-item border-0 rounded mb-3" style={{ backgroundColor: "#eef8f6" }}>
                        <h2 className="accordion-header">
                            <button
                                className="accordion-button collapsed fw-semibold text-dark"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#faq1"
                                style={{ backgroundColor: "#eef8f6" }}
                            >
                                Do I need a laptop to do the course?
                            </button>
                        </h2>
                        <div id="faq1" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                            <div className="accordion-body text-dark ps-4">
                                Yes, you will need a laptop to complete the course smoothly.
                            </div>
                        </div>
                    </div>

                    <div className="accordion-item border-0 rounded mb-3" style={{ backgroundColor: "#eef8f6" }}>
                        <h2 className="accordion-header">
                            <button
                                className="accordion-button fw-semibold text-dark"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#faq2"
                                style={{ backgroundColor: "#eef8f6" }}
                            >
                                How will the Placement Assurance work?
                            </button>
                        </h2>
                        <div id="faq2" className="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
                            <div className="accordion-body text-dark ps-4">
                                On successful completion of the course, our placements team will ensure
                                that you apply to 10 partnered jobs per week...
                            </div>
                        </div>
                    </div>

                    <div className="accordion-item border-0 rounded mb-3" style={{ backgroundColor: "#eef8f6" }}>
                        <h2 className="accordion-header">
                            <button
                                className="accordion-button collapsed fw-semibold text-dark"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#faq3"
                                style={{ backgroundColor: "#eef8f6" }}
                            >
                                How will I be taught concepts in the class?
                            </button>
                        </h2>
                        <div id="faq3" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                            <div className="accordion-body text-dark ps-4">
                                Concepts will be taught through live interactive sessions and recorded content.
                            </div>
                        </div>
                    </div>

                    <div className="accordion-item border-0 rounded mb-3" style={{ backgroundColor: "#eef8f6" }}>
                        <h2 className="accordion-header">
                            <button
                                className="accordion-button collapsed fw-semibold text-dark"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#faq4"
                                style={{ backgroundColor: "#eef8f6" }}
                            >
                                What is the duration of this course?
                            </button>
                        </h2>
                        <div id="faq4" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                            <div className="accordion-body text-dark ps-4">
                                The duration is generally 6–10 months depending on the student’s pace.
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
