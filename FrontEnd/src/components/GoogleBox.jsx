import { GoogleLogin } from '@react-oauth/google';
import Cookie from "universal-cookie";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { addUser } from '../store/userSlice';
import { useDispatch } from 'react-redux';
import axios from "axios";

const url = import.meta.env.VITE_BACKEND_URL;
const GoogleBox = ({ setIsLoading, type }) => {
  const cookie = new Cookie();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleGoogleLogin = async (credentialResponse) => {
    try {
      setIsLoading(true); // Set loading state
      if (!credentialResponse.credential) {
        toast.error('Login Error');
        setIsLoading(false);
        return;
      }
      // Send POST request to the backend
      const response = await axios.post(`${url}/user/google_login`, {
        token: credentialResponse.credential
      });

      if (response.data.status) {
        toast.success('Logged In Successfully');
        const token = response.data.token;
        if (token) {
          // Save token in cookies
          cookie.set(`user_token`, token, {
            path: '/',
            expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year expiry
          });
          dispatch(addUser(response?.data.user));

          // Navigate to user dashboard
          navigate(`/user/dashboard`);
        }
      } else {
        toast.error(response.data.message || "Login failed");
      }
    } catch (error) {
      console.error(error);
      const errorMsg = error.response?.data?.message || "Google Login failed.";
      toast.error(errorMsg);
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  const handleGoogleLoginError = () => {
    toast.error("Login failed");
  };

  return (
    <div className="flex justify-center items-center">
      <GoogleLogin
        onSuccess={handleGoogleLogin}
        onError={handleGoogleLoginError}
      />
    </div>
  );
};

export default GoogleBox;