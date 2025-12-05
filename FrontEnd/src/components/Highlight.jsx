import "bootstrap/dist/css/bootstrap.min.css";

export default function HighlightsSection() {
    return (
        <section className="py-20" style={{ backgroundColor: "#004d42" }}>
            <div className="container">
                <div className="row g-4 align-items-center">

                    <div className="col-md-7 text-center text-white">
                        <h3 className="fw-bold mb-4">Key Highlights</h3>

                        <div className="row g-3 justify-content-center" id="stats">
                            <div className="col-6  col-md-6">
                                <div className=" text-white fw-bold rounded p-4 shadow">
                                    <span>1600+</span><br /><span>Students Placed</span>
                                </div>
                            </div>

                            <div className="col-6 col-md-6">
                                <div className=" text-white fw-bold rounded p-4 shadow" >
                                    <span>12LPA</span> <br /><span>Highest CTC</span>
                                </div>
                            </div>

                            <div className="col-6 col-md-6">
                                <div className=" text-white fw-bold rounded p-4 shadow">
                                    <span>10</span><br /><span>Assured Interviews</span>
                                </div>
                            </div>

                            <div className="col-6 col-md-6">
                                <div className=" text-white fw-bold rounded p-4 shadow">
                                    <span>1000+</span><br /><span>Hiring Partners</span>
                                </div>
                            </div>
                        </div>

                        <p className="mt-5">
                            The Program has been created in collaboration with Managers from
                        </p>

                        <div className="row justify-content-center align-items-center g-4 mt-2 text-center fw-bold">
                            <div className="col-6 col-md-3">
                                <img
                                    src="https://webcdn.imarticus.org/mycaptain/image.webp"
                                    alt="Zomato"
                                />
                            </div>

                            <div className="col-6 col-md-3">
                                <img
                                    src="https://webcdn.imarticus.org/mycaptain/logo5.webp"
                                    alt="Rapido"
                                />
                            </div>

                            <div className="col-6 col-md-3">
                                <img
                                    src="https://webcdn.imarticus.org/mycaptain/logo6.webp"
                                    alt="mFine"
                                />
                            </div>

                            <div className="col-6 col-md-3">
                                <img
                                    src="https://webcdn.imarticus.org/mycaptain/deloitte2.webp"
                                    alt="Deloitte"
                                />
                            </div>

                        </div>

                    </div>

                    <div className="col-md-5">
                        <div className="bg-white rounded-4 p-4 shadow-lg">

                            <h6>
                                Apply For The{" "}
                                <strong style={{ color: "#ff7645" }}>
                                    MyCaptain Machine Learning Job Assurance Program
                                </strong>
                            </h6>

                            <div className="mt-3">

                                <input
                                    className="form-control mb-3"
                                    placeholder="Full Name"
                                />

                                <input
                                    className="form-control mb-3"
                                    placeholder="Email ID"
                                />

                                <div className="input-group mb-3">
                                    <select className="form-select" style={{ maxWidth: "120px" }}>
                                        <option>India (+91)</option>
                                    </select>
                                    <input
                                        className="form-control"
                                        placeholder="Mobile Number"
                                    />
                                </div>

                                <select className="form-select mb-3">
                                    <option>Select Location</option>
                                </select>

                                <select className="form-select mb-4">
                                    <option>Professional Experience</option>
                                </select>

                                <button
                                    className="btn w-100 fw-bold py-2"
                                    style={{ backgroundColor: "#FF7645", color: "white" }}
                                >
                                    Next
                                </button>

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
