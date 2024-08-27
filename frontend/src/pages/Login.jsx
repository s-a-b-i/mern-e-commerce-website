import React, { useState, useCallback, useContext } from "react";
import {
  RiEyeLine,
  RiEyeOffLine,
  RiLockPasswordLine,
  RiMailLine,
} from "react-icons/ri";
import loginImage from "../asset/loginI.png";
import loginIcons from "../asset/loginG.gif";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { axiosInstance, ApiCollection } from ".././utils/axios.Config.js";
import 'react-toastify/dist/ReactToastify.css';
import { Context } from "../context/index.jsx";

const Login = () => {
  const navigate = useNavigate();
  const { fetchUserDetails ,getCartItemCount  } = useContext(Context);

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = useCallback((event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    
    // Check for empty fields
    if (!formData.email || !formData.password) {
      toast.error("Please enter both email and password.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    try {
      const response = await axiosInstance.post(ApiCollection.login.url, formData);
      toast.success("Login successful!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      // Redirect to Home or any other page after login
      setTimeout(() => {
        navigate("/");
        fetchUserDetails();
        getCartItemCount();
      }, 2000);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("Incorrect email or password. Please try again.", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error("Failed to log in. Please try again later.", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        console.error("Error logging in:", error.message);
      }
    }
  };

  return (
    <section
      id="login"
      className="bg-green-100 min-h-screen flex items-center justify-center"
    >
      <div className="container mx-auto flex justify-center px-4 sm:px-8">
        <div className="w-full max-w-4xl bg-green-200 shadow-md rounded-lg border border-gray-300 px-4 py-8 sm:px-10 flex flex-col md:flex-row">
          <div className="hidden md:block w-1/2">
            <img
              src={loginImage}
              alt="Login"
              className="w-full h-auto rounded-l-lg"
            />
          </div>

          <div className="w-full md:w-1/2 flex flex-col justify-center px-4 sm:px-8">
            <header className="flex items-center justify-center mb-8">
              <img
                src={loginIcons}
                alt="Login Logo"
                className="mr-4"
                style={{ width: "80px", height: "80px" }}
              />
              <h1 className="text-2xl font-bold text-gray-800">Login</h1>
            </header>

            <form className="mb-4" onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  <RiMailLine className="inline-block mr-2 text-green-500" /> Email
                </label>
                <input
                  className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  name="email"
                  onChange={handleOnChange}
                  value={formData.email}
                  placeholder="Email"
                  autoComplete="off"
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  <RiLockPasswordLine className="inline-block mr-2 text-green-500" /> Password
                </label>
                <div className="relative">
                  <input
                    className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    name="password"
                    onChange={handleOnChange}
                    value={formData.password}
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    autoComplete="off"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                    onClick={togglePasswordVisibility}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <RiEyeOffLine className="text-gray-600" />
                    ) : (
                      <RiEyeLine className="text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex justify-center mb-4">
                <button
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transform transition-transform duration-200 ease-in-out hover:scale-105 shadow-lg"
                  type="submit"
                >
                  Log In
                </button>
              </div>

              <div className="flex flex-col sm:flex-row sm:justify-between items-center text-center">
                <Link
                  to="/forgot-password"
                  className="inline-block align-baseline font-bold text-sm text-green-700 hover:text-green-800 mb-2 sm:mb-0 underline"
                >
                  Forgot Password?
                </Link>
                <Link
                  to="/signup"
                  className="inline-block align-baseline font-bold text-sm text-green-700 hover:text-green-800"
                >
                  Don't have an account?{" "}
                  <span className="text-blue-700 underline">
                    Sign Up
                  </span>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
