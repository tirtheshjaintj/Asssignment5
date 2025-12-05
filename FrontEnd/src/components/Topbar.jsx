import "bootstrap/dist/css/bootstrap.min.css";

export default function Topbar() {
    return (
        <>
            <div className="d-flex bg-white">
                <img
                    id="logo"
                    width={190}
                    className=" my-3"
                    src="https://cdn.pegasus.imarticus.org/imarticus12/newIL12.svg" alt="" />
            </div>
            <div className="d-flex justify-content-center" style={{
                backgroundColor: "#035642",
            }}>
                <div className="topbar d-flex p-3">
                    <span style={{ borderBottom: "4px solid #ff7a4f" }}>Overview</span>
                    <span>Hiring&nbsp;Partners</span>
                    <span>Curriculum</span>
                    <span>Trainers</span>
                    <span>Projects</span>
                    <span>Success&nbsp;Stories</span>
                    <span>Pricing</span>
                    <span>FAQs</span>
                </div>
            </div></>
    )
}
