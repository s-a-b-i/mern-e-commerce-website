import axios from "axios";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { axiosInstance, ApiCollection } from "../../../backend/common/axios.Config";

const Logout = async () => {
  try {
    const response = await axiosInstance(ApiCollection.logout);
    if (response.status === 200) {
      toast.success("Logged out successfully!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      // Add logic to handle successful logout, e.g., redirect to login page
      // You might want to use a router here to redirect
      // history.push('/login');
    }
  } catch (error) {
    let errorMessage = "Logout failed!";
    if (error.response) {
      errorMessage = error.response.data.message || errorMessage;
      console.error("Error response:", error.response.data);
      console.error("Error status:", error.response.status);
    } else if (error.request) {
      errorMessage = "No response received from server";
      console.error("Error request:", error.request);
    } else {
      errorMessage = error.message;
      console.error("Error message:", error.message);
    }
    toast.error(errorMessage, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
};

export { Logout };