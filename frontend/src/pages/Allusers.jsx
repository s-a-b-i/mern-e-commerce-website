import React, { useState, useEffect } from 'react';
import { axiosInstance, ApiCollection } from '../../../backend/common/axios.Config.js';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaEnvelope, FaUserTag, FaCalendarAlt, FaEdit } from 'react-icons/fa';
import UpdateUserDetails from '../components/UpdateUserDetails.jsx';

const Allusers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get(ApiCollection.allUsers.url);
        setUsers(response.data.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.error || 'An error occurred');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleEditUser = (user) => {
    setSelectedUser(user);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
  };

  const handleUpdateUser = (updatedUser) => {
    setUsers(users.map(user => user._id === updatedUser._id ? updatedUser : user));
  };

  const LoadingSpinner = () => (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-mint-500"></div>
    </div>
  );

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-center text-2xl mt-10 text-red-500">Error: {error}</div>;

  return (
    <div className="p-4 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center text-teal-800 font-serif">All Users</h1>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className="overflow-hidden"
      >
        <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-mint-100">
            <tr>
              <th className="px-4 py-2 text-left">Sr.</th>
              <th className="px-4 py-2 text-left">Username</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Role</th>
              <th className="px-4 py-2 text-left">Created At</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <motion.tr
                key={user._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="border-b hover:bg-green-50 transition-colors duration-200"
              >
                <td className="px-4 py-2 text-center">{index + 1}</td>
                <td className="px-4 py-2">
                  <div className="flex items-center">
                    <FaUser className="mr-2 text-blue-500" />
                    {user.username}
                  </div>
                </td>
                <td className="px-4 py-2">
                  <div className="flex items-center">
                    <FaEnvelope className="mr-2 text-green-500" />
                    {user.email}
                  </div>
                </td>
                <td className="px-4 py-2">
                  <div className="flex items-center">
                    <FaUserTag className="mr-2 text-purple-500" />
                    {user.role}
                  </div>
                </td>
                <td className="px-4 py-2">
                  <div className="flex items-center">
                    <FaCalendarAlt className="mr-2 text-orange-500" />
                    {new Date(user.createdAt).toLocaleDateString()}
                  </div>
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleEditUser(user)}
                    className="flex items-center px-2 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-200"
                  >
                    <FaEdit className="mr-2" />
                    Edit
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
      <AnimatePresence>
        {selectedUser && (
          <UpdateUserDetails
            user={selectedUser}
            onClose={handleCloseModal}
            onUpdate={handleUpdateUser}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Allusers;
