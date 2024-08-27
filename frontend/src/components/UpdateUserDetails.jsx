import React, { useState } from 'react';
import { axiosInstance, ApiCollection } from '.././utils/axios.Config.js';
import { motion } from 'framer-motion';
import { Role } from '.././utils/role.js';
import { toast } from 'react-toastify';
import { FaEnvelope, FaUser, FaUserTag, FaTimes } from 'react-icons/fa';

const UpdateUserDetails = ({ user, onClose, onUpdate }) => {
  const [userData, setUserData] = useState({
    email: user.email,
    role: user.role,
    username: user.username
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.put(ApiCollection.updateUserDetails.url, {
        userId: user._id,
        ...userData
      });
      onUpdate(response.data.data);
      toast.success("User details updated successfully!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      onClose();
    } catch (err) {
      if (err.response?.status === 403) {
        setError("You don't have permission to update user details.");
      } else {
        setError(err.response?.data?.error || 'An error occurred');
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors duration-200"
        >
          <FaTimes size={24} />
        </button>
        <h2 className="text-3xl font-bold mb-6 text-center text-green-600">Update User Details</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <FaEnvelope className="absolute top-3 left-3 text-green-500" />
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-2 border-2 border-green-300 rounded-full focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Email"
            />
          </div>
          <div className="relative">
            <FaUser className="absolute top-3 left-3 text-green-500" />
            <input
              type="text"
              name="username"
              value={userData.username}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-2 border-2 border-green-300 rounded-full focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Username"
            />
          </div>
          <div className="relative">
            <FaUserTag className="absolute top-3 left-3 text-green-500" />
            <select
              name="role"
              value={userData.role}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-2 border-2 border-green-300 rounded-full focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none"
            >
              <option value={Role.GENERAL}>General</option>
              <option value={Role.ADMIN}>Admin</option>
            </select>
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <div className="flex justify-center space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition duration-300"
            >
              Update Details
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default UpdateUserDetails;
