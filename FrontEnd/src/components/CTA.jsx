import "bootstrap/dist/css/bootstrap.min.css";

import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axios/axiosConfig";
import toast from "react-hot-toast";
import { useState } from "react";
const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_API_KEY;

export default function CTA() {
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const handleClick = async () => {
        if (!user) {
            navigate("/user/login");
        } else {

            setIsLoading(true);
            try {
                const instance = async () => {
                    try {
                        const response = await axiosInstance.post(`/razor/create`);
                        return response.data.result;
                    } catch (error) {
                        //////console.log("error: ", error);
                    } finally {
                        setIsLoading(false);
                    }
                };

                const order = await instance();
                const key = RAZORPAY_KEY;
                const options = {
                    key,
                    currency: "INR",
                    name: user?.name,
                    description: "RazorPay",
                    order_id: order.id,
                    notes: {
                        address: "Razorpay Corporate Office",
                    },
                    theme: {
                        color: "#121212",
                    },
                    handler: async (response) => {
                        // Handle the payment success on the client side
                        try {
                            const verifyResponse = await axiosInstance.post(`/razor/verify`, {
                                order_id: response.razorpay_order_id,
                                payment_id: response.razorpay_payment_id,
                                signature: response.razorpay_signature
                            });

                            if (verifyResponse.data.status) {
                                toast.success("Payment Successful! Thanks for the Purchase");
                                navigate("/user/dashboard");
                            } else {
                                toast.error("Payment verification failed.");
                            }
                        } catch (error) {
                            toast.error("Error during payment verification.");
                        }
                    },
                    prefill: {
                        email: user.email,
                        contact: user.phone,
                    },
                };
                const razor = new window.Razorpay(options);
                razor.open();

            } catch (error) {
                console.log(error);
                toast.error("Sorry, cannot process the order right now.");
            }

        }
    }
    return (
        <div className="container my-4 d-flex flex-column flex-md-row gap-3 justify-content-center  pb-10">
            <button onClick={handleClick} className="btn w-100 w-md-50 py-3 fw-semibold d-flex justify-content-center" style={{ backgroundColor: "#FF7645", color: "white" }}>
                {isLoading ? <div className="spinner"></div> : "Apply Now"}
            </button>
            <button className="btn w-100 w-md-50 py-3 fw-semibold" style={{ backgroundColor: "#1D2738", color: "white" }}>
                Download Brochure
            </button>
        </div>
    )
}
