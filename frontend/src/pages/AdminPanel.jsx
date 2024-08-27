import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FaUsers, FaBox, FaChartBar, FaCog } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

const AdminPanel = () => {
  const user = useSelector((state) => state.user?.user?.data);
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname.split('/').pop());

  const navigation = [
    { name: 'Dashboard', icon: FaChartBar, id: 'dashboard', path: '' },
    { name: 'Users', icon: FaUsers, id: 'users', path: 'allusers' },
    { name: 'Products', icon: FaBox, id: 'products', path: 'products' },
    { name: 'Settings', icon: FaCog, id: 'settings', path: 'settings' },
  ];

  const handleTabChange = (id, path) => {
    setActiveTab(id);
    navigate(path);
  };

  return (
    <div className="flex h-screen bg-green-100 p-4">
      <Sidebar user={user} navigation={navigation} activeTab={activeTab} onTabChange={handleTabChange} />
      <MainContent />
    </div>
  );
};

const Sidebar = ({ user, navigation, activeTab, onTabChange }) => (
  <motion.aside
    initial={{ x: -300 }}
    animate={{ x: 0 }}
    transition={{ type: 'spring', stiffness: 100 }}
    className="w-64 bg-green-200 shadow-lg rounded-3xl overflow-hidden"
  >
    <UserProfile user={user} />
    <Navigation items={navigation} activeTab={activeTab} onTabChange={onTabChange} />
  </motion.aside>
);

const UserProfile = ({ user }) => (
  <div className="p-4 border-b border-green-300">
    <div className="flex items-center space-x-4">
      <img
        src={user?.profileImage || '/path/to/default-avatar.png'}
        alt={user?.username || 'User'}
        className="w-12 h-12 rounded-full object-cover border-2 border-green-500"
      />
      <div>
        <h3 className="font-semibold text-green-800">{user?.username || 'User'}</h3>
        <p className="text-sm text-green-600">{user?.role || 'Admin'}</p>
      </div>
    </div>
  </div>
);

const Navigation = ({ items, activeTab, onTabChange }) => (
  <nav className="mt-6">
    {items.map((item) => (
      <NavItem key={item.id} item={item} isActive={activeTab === item.id} onClick={() => onTabChange(item.id, item.path)} />
    ))}
  </nav>
);

const NavItem = ({ item, isActive, onClick }) => (
  <button
    className={`flex items-center w-full px-4 py-3 text-green-700 hover:bg-green-300 hover:text-green-900 transition-colors duration-200 ${
      isActive ? 'bg-green-300 text-green-900 font-semibold' : ''
    }`}
    onClick={onClick}
  >
    <item.icon className="w-5 h-5 mr-4" />
    {item.name}
  </button>
);

const MainContent = () => (
  <main className="flex-1 overflow-auto p-8">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto bg-green-50 rounded-3xl shadow-md p-6 border border-green-200"
    >
      <Outlet />
    </motion.div>
  </main>
);

export { AdminPanel };