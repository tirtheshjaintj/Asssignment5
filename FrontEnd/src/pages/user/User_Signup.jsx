import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Cookie from 'universal-cookie';
import EyeToggleSVG from '../../components/Eye';
import { FaLock, FaUser } from 'react-icons/fa';
import GoogleBox from '../../components/GoogleBox';
import axiosInstance from '../../axios/axiosConfig';
const url = import.meta.env.VITE_BACKEND_URL;

function User_Signup() {
    const [step, setStep] = useState(1);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [user, setUser] = useState({
        name: '',
        email: '',
        phone_number: '',
        password: '',
        confirmPassword: '',
    });


    const [otp, setOtp] = useState('');
    const [userId, setUserId] = useState('');
    const navigate = useNavigate();
    const cookie = new Cookie();
    const [resendDisabled, setResendDisabled] = useState(false);
    const [timer, setTimer] = useState(60); // 60 seconds timer
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        document.title = ' User Signup';
        let token = cookie.get('user_token');
        if (token) navigate('/user/dashboard');
    }, []);

    const handleShowPasswordToggle = () => {
        setShowPassword(!showPassword);
    };

    const handleShowConfirmPasswordToggle = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleBack = () => {
        setStep(step - 1);
    }

    const handleNext = () => {
        if (step === 1) {
            if (!user.name.match(/^[a-zA-Z\s]+$/)) {
                toast.error('Name must contain only letters and spaces.');
            } else if (user.name.length < 3) {
                toast.error('Name must be at least 3 characters long.');
            } else if (!user.email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
                toast.error('Please enter a valid email address.');
            } else if (!user.phone_number.match(/^[0-9]{10}$/)) {
                toast.error('Phone number must contain exactly 10 digits.');
            } else {
                setStep(step + 1);
            }
        }
        else if (step === 2) {
            if (user.password.length < 8) {
                toast.error('Password must be at least 8 characters long.');
            } else if (user.password !== user.confirmPassword) {
                toast.error('Passwords do not match.');
            } else {
                setStep(step + 1);
            }
        }
    };





    const handleSubmit = async (e) => {
        e.preventDefault();
        if (user.password !== user.confirmPassword) {
            toast.error('Passwords do not match.');
            return;
        }
        setIsLoading(true); // Disable the button
        try {
            const response = await axiosInstance.post(`/user/signup`, {
                name: user.name,
                email: user.email,
                phone_number: user.phone_number,
                password: user.password,
            });

            if (response.data.status) {
                setUserId(response.data.user._id);
                setStep(3); // Move to OTP verification step
                toast.success(response.data.message);
            }
        } catch (error) {
            ////console.log(error);
            const error_msg = error.response.data.message;
            toast.error(error_msg);
        } finally {
            setIsLoading(false); // Re-enable the button
        }
    };

    const handleOtpSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true); // Disable the button

        try {
            const response = await axiosInstance.post(`/user/verify-otp/${userId}`, {
                otp,
            });

            if (response.data.status) {
                toast.success(response.data.message);
                const token = response?.data?.token;
                if (token) {
                    cookie.set("user_token", token, { path: '/', expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) });
                    navigate('/user/dashboard');
                }
            }
        } catch (error) {
            const error_msg = error.response.data.message;
            toast.error(error_msg);
        } finally {
            setIsLoading(false); // Re-enable the button
        }
    };


    const handleResendOtp = async () => {
        try {
            const response = await axiosInstance.post(`/user/resend-otp/${userId}`);
            if (response.data.status) {
                toast.success(response.data.message);
                setResendDisabled(true); // Disable button
                setTimer(60); // Reset timer
            }
        } catch (error) {
            const error_msg = error.response.data.message;
            toast.error(error_msg);
        }
    };

    useEffect(() => {
        let interval;
        if (resendDisabled) {
            interval = setInterval(() => {
                setTimer((prev) => {
                    if (prev === 1) {
                        setResendDisabled(false); // Enable button
                        clearInterval(interval);
                        return 60; // Reset timer for future use
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [resendDisabled]);


    return (
        <section className="min-h-screen pb-8 md:pb-0">
            <div className="flex flex-col items-center justify-center h-screen px-6 py-8 mx-auto lg:py-0">
                <h1 className="flex items-center mb-6 text-4xl font-semibold text-gray-900 dark:text-white">
                    User SignUp
                </h1>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">

                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            <div className="flex items-center"> {step < 3 ? <> Sign up to your account&nbsp;<FaUser /></> : <>Verify OTP&nbsp;<FaLock /></>}</div>
                        </h1>

                        <form onSubmit={step === 2 ? handleSubmit : handleOtpSubmit} className="space-y-4 md:space-y-6" action="#">
                            {step === 1 && (
                                <>
                                    <div>
                                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            Your Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            value={user.name}
                                            onChange={handleChange}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="John Doe"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            Your email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            value={user.email}
                                            onChange={handleChange}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="name@company.com"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="phone_number" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            Phone Number
                                        </label>
                                        <input
                                            type="text"
                                            name="phone_number"
                                            id="phone_number"
                                            value={user.phone_number}
                                            onChange={handleChange}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="1234567890"
                                            required
                                        />
                                    </div>
                                </>
                            )}

                            {step === 2 && (
                                <>
                                    <div>
                                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            Password
                                        </label>
                                        <div className="relative">
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                name="password"
                                                id="password"
                                                value={user.password}
                                                onChange={handleChange}
                                                placeholder="••••••••"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                required
                                            />
                                            <span
                                                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                                            >
                                                <EyeToggleSVG handleShowPasswordToggle={handleShowPasswordToggle} />
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            Confirm Password
                                        </label>
                                        <div className="relative">
                                            <input
                                                type={showConfirmPassword ? 'text' : 'password'}
                                                name="confirmPassword"
                                                id="confirmPassword"
                                                value={user.confirmPassword}
                                                onChange={handleChange}
                                                placeholder="••••••••"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                required
                                            />
                                            <span
                                                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                                            >
                                                <EyeToggleSVG handleShowPasswordToggle={handleShowConfirmPasswordToggle} />
                                            </span>
                                        </div>
                                    </div>
                                </>
                            )}
                            {step === 3 && (
                                <>
                                    <div>
                                        <label htmlFor="otp" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            Enter OTP
                                        </label>
                                        <input
                                            type="number"
                                            name="otp"
                                            id="otp"
                                            value={otp}
                                            min="100000"
                                            max="999999"
                                            onChange={(e) => setOtp(e.target.value)}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="123456"
                                            required
                                        />
                                    </div>
                                    <div className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500 cursor-pointer">
                                        {resendDisabled ? (
                                            <p>Resend OTP in {timer} seconds</p>
                                        ) : (
                                            <p onClick={handleResendOtp}>Resend OTP</p>
                                        )}
                                    </div>

                                </>
                            )}

                            {step < 3 && (
                                <button
                                    type={step === 2 ? 'submit' : 'button'}
                                    className="w-full dark:text-white bg-red-600 text-black focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                    onClick={step < 2 ? handleNext : undefined}
                                    disabled={isLoading} // Disable the button
                                >
                                    {isLoading ? (
                                        <div className="flex items-center justify-center">
                                            <div className="spinner"></div>
                                        </div>
                                    ) : (
                                        <span>{step === 2 ? 'Sign up' : 'Next'}</span>
                                    )}
                                </button>
                            )}
                            {step < 3 && step > 1 && (
                                <button
                                    type='button'
                                    className="w-full text-white bg-gray-600 text-black focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                    onClick={handleBack}
                                >
                                    Back
                                </button>
                            )}
                            {step === 3 &&
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    OTP sent to {user.email}
                                </p>
                            }
                            {step === 3 && (
                                <button
                                    type="submit"
                                    className="w-full dark:text-white bg-red-600 text-black focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                    disabled={isLoading} // Disable the button
                                >
                                    {isLoading ? (
                                        <div className="flex items-center justify-center">
                                            <div className="spinner"></div>
                                        </div>
                                    ) : (
                                        'Verify OTP'
                                    )}
                                </button>
                            )}
                            <GoogleBox setIsLoading={setIsLoading} />
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Already have an account?{' '}
                                <Link to="/user/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                                    Login here
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default User_Signup;
