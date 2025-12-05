import React from 'react'

export default function Hero() {
    return (
        <>
            <div className="d-flex flex-column justify-content-center align-items-center m-2" style={{ backgroundColor: "whitesmoke" }}>
                <div className="d-flex justify-content-center mt-10">
                    <img width={240} src="https://webcdn.imarticus.org/mycaptain/mycaptain-logo_1111.webp" alt="" />
                </div>
                <h1 id="title" className="text-center my-2 p-1 fw-bolder">Become a Machine Learning Expert in <br /> 18 Weeks</h1>
                <h2 id="description" className="text-center p-1 fw-bolder">MyCaptain Machine Learning Program with Job Assurance</h2>
            </div >
        </>
    )
}
