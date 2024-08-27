
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  RiEyeLine,
  RiEyeOffLine,
  RiLockPasswordLine,
  RiMailLine,
} from "react-icons/ri";
import { FaUpload } from "react-icons/fa";
import loginImage from "../asset/signUpI.png";
import ImageToBase64 from "../utils/ImageToBase64";
import { axiosInstance ,ApiCollection } from "../../../backend/common/axios.config.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    profileImage: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Handle changes in form inputs
  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle profile image upload and convert to base64
  const handleUploadFile = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const convertedImage = await ImageToBase64(file);
      setFormData((prev) => ({
        ...prev,
        profileImage: convertedImage,
      }));
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Toggle confirm password visibility
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // Validate form data
  const validate = () => {
    let tempErrors = {};
    if (!formData.email) tempErrors.email = "Email is required.";
    if (!formData.username) tempErrors.username = "Username is required.";
    if (!formData.password) tempErrors.password = "Password is required.";
    if (formData.password.length < 6)
      tempErrors.password = "Password must be at least 6 characters.";
    if (formData.password !== formData.confirmPassword)
      tempErrors.confirmPassword = "Passwords do not match.";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Handle form submission
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (validate()) {
      try {
        const response = await axiosInstance.post(ApiCollection.signUp.url, formData);
        toast.success("User registered successfully!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } catch (error) {
        if (error.response) {
          const errorMessage =
            error.response.data.message || "Error registering user.";
          if (error.response.status === 409) {
            toast.error(
              "User with the same email or username already exists.",
              {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              }
            );
          } else {
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
          console.error("Error registering user:", errorMessage);
          setErrors({ server: errorMessage });
        } else {
          toast.error("Failed to register user. Please try again later.", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          console.error("Error registering user:", error.message);
        }
      }
    }
  };

  return (
    <section
      id="signup"
      className="bg-green-100 min-h-screen flex items-center justify-center"
    >
      <div className="container mx-auto flex justify-center px-4 sm:px-8">
        <div className="w-full max-w-6xl bg-green-200 shadow-md rounded-lg border border-gray-300 px-4 py-8 sm:px-8 sm:py-10 flex flex-col md:flex-row">
          {/* Sign Up Image Section */}
          <div className="hidden md:block w-1/2">
            <img
              src={loginImage}
              alt="Sign Up"
              className="w-full h-auto rounded-l-lg"
            />
          </div>

          {/* Sign Up Form Section */}
          <div className="w-full md:w-1/2 flex flex-col justify-center px-4 sm:px-8">
            <div className="flex items-center justify-center mb-8">
              {/* Upload Image Button */}
              <label
                htmlFor="profileImage"
                className="rounded-full bg-green-100 p-3 cursor-pointer flex items-center justify-center"
              >
                {formData.profileImage ? (
                  <img
                    src={formData.profileImage}
                    alt="Profile Preview"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <FaUpload size={32} color="gray" />
                )}
                <input
                  type="file"
                  id="profileImage"
                  name="profileImage"
                  onChange={handleUploadFile}
                  className="hidden"
                />
              </label>
            </div>

            {/* Form */}
            <form className="mb-4" onSubmit={handleFormSubmit}>
              {/* Email Input */}
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  <RiMailLine className="inline-block mr-2" /> Email
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
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              {/* Username Input */}
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  Username
                </label>
                <input
                  className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                  name="username"
                  onChange={handleOnChange}
                  value={formData.username}
                  placeholder="Username"
                  autoComplete="off"
                />
                {errors.username && (
                  <p className="text-red-500 text-xs mt-1">{errors.username}</p>
                )}
              </div>

              {/* Password Input */}
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  <RiLockPasswordLine className="inline-block mr-2" /> Password
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
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <RiEyeOffLine /> : <RiEyeLine />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password Input */}
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="confirmPassword"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="confirmPassword"
                    name="confirmPassword"
                    onChange={handleOnChange}
                    value={formData.confirmPassword}
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    autoComplete="off"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={toggleConfirmPasswordVisibility}
                  >
                    {showConfirmPassword ? <RiEyeOffLine /> : <RiEyeLine />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Sign Up Button */}
              <div className="flex justify-center mb-4">
                <button
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transform transition-transform duration-200 ease-in-out hover:scale-105 shadow-lg"
                  type="submit"
                >
                  Sign Up
                </button>
              </div>

              {/* Server Error Message */}
              {errors.server && (
                <p className="text-red-500 text-center text-sm mb-4">
                  {errors.server}
                </p>
              )}

              {/* Login Link */}
              <div className="text-center">
                <Link
                  to="/login"
                  className="inline-block align-baseline font-bold text-sm text-green-700 hover:text-green-800"
                >
                  Already have an account?{" "}
                  <span className="text-blue-700 hover:text-blue-800 underline">
                    Log In
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










export default SignUp;



