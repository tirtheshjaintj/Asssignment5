import "bootstrap/dist/css/bootstrap.min.css";
import React from 'react'
import { FaStar, FaUserFriends } from "react-icons/fa";

export default function Details() {
    return (
        <>
            <div className="container my-4">
                <div className="shadow rounded p-4 bg-white d-flex flex-column flex-md-row justify-content-between align-items-center text-center">
                    <div className="px-3">
                        <small className="text-muted">Next Batch</small>
                        <h6 className="fw-bold mt-1">October</h6>
                    </div>

                    <div className="border-start border-end px-3">
                        <small className="text-muted">Available Seats</small>
                        <h6 className="fw-bold mt-1">29/60</h6>
                    </div>

                    <div className="px-3">
                        <small className="text-muted">Taught by experts from</small>
                        <h6 className="fw-bold mt-1">Rapido, Deloitte, MFine, Zomato</h6>

                        <div className="bg-light rounded-pill px-3 py-1 mt-2 d-inline-flex align-items-center gap-2">
                            <FaStar className="text-warning" />
                            <small>4.51</small>
                            <FaUserFriends />
                            <small>1.2 Lacs+ Learners</small>
                        </div>
                    </div>

                    <div className="border-start ps-3 d-none d-md-block">
                        <small className="text-muted">Designed for</small>
                        <h6 className="fw-bold mt-1">
                            Freshers & Early Working Professionals
                        </h6>
                    </div>

                </div>
            </div>
        </>
    )
}
