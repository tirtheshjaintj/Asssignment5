import { Outlet } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookie from "universal-cookie";
import axios from "axios";
import { addUser } from "./store/userSlice";
import axiosInstance from "./axios/axiosConfig";
const url = import.meta.env.VITE_BACKEND_URL;

function App() {
  const cookie = new Cookie();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const getUser = async () => {
    try {
      const token = cookie.get('user_token');
      const response = await axiosInstance.get(`/user/getUser`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      const userData = response.data;
      if (userData.status) {
        dispatch(addUser(userData.user));
      } else {
        toast.error(userData.message);
        cookie.remove('user_token');
      }
    } catch (error) {
      //console.log(error);
    }
  };


  useEffect(() => {
    //console.log(url);
    document.title = "Imarticus Learning";
    getUser();
  }, []);

  useEffect(() => {
    //console.log(user);
  }, [user]);

  return (
    <>
      <Toaster position="bottom-right" />
      <Outlet />
    </>
  )
}

export default App
