import React, { useState, useRef, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaShoppingCart, FaCog } from "react-icons/fa";
import { toast } from 'react-toastify';
import Logo from "./Logo";
import 'react-toastify/dist/ReactToastify.css';
import { Logout } from "../pages/Logout.jsx";
import { setUserDetails } from "../store/userslice";
import { Role } from ".././utils/axios.Config.js";
import { Context } from "../context/index.jsx";
import SearchBar from "./SearchBar.jsx";

const Header = () => {
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef(null);
  const context = useContext(Context);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await Logout();
      dispatch(setUserDetails(null));
      navigate('/');
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleAdminPanelClick = () => {
    if (user?.data?.role === Role.ADMIN) {
      if (window.innerWidth < 1024) {
        toast.info("For the best experience, please use the Admin Panel on a desktop.", {
          position: "top-center",
          autoClose: 3000,
        });
      } else {
        navigate('/admin');
      }
    } else {
      toast.error("Login as admin to access the Admin Panel.", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="h-16 sm:h-20 shadow-md bg-[#d5f5d5] fixed w-full z-30">
      <div className="h-full container mx-auto flex items-center px-4 sm:px-6 lg:px-8 justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/">
            <Logo w={80} h={48} />
          </Link>
        </div>

        {/* Search bar - hidden on mobile */}
        <SearchBar/>

        {/* User menu, cart, and login/signup buttons */}
        <div className="flex items-center space-x-3 sm:space-x-6 relative">
          {user ? (
            <>
              <div className="relative" ref={dropdownRef}>
                {user.data.profileImage ? (
                  <img
                    src={user.data.profileImage}
                    alt={user.data.name}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover cursor-pointer"
                    onClick={() => setShowDropdown(!showDropdown)}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/path/to/default-avatar.png";
                    }}
                  />
                ) : (
                  <div
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-green-500 flex items-center justify-center cursor-pointer"
                    onClick={() => setShowDropdown(!showDropdown)}
                  >
                    <span className="text-white text-lg font-semibold">
                      {user.data.username ? user.data.username.charAt(0).toUpperCase() : 'U'}
                    </span>
                  </div>
                )}
                {/* Dropdown menu */}
                {showDropdown && (
                  <div className="absolute left-1/2 transform -translate-x-1/2 top-12 mt-2 w-48 sm:w-56 bg-white rounded-lg shadow-xl py-2 z-10">
                    <button
                      onClick={handleAdminPanelClick}
                      className="w-full text-left px-4 py-2 text-sm sm:text-base text-gray-700 hover:bg-green-100 flex items-center transition-colors duration-200 ease-in-out"
                    >
                      <FaCog className="mr-3 text-green-500" /> Admin Panel
                    </button>
                  </div>
                )}
              </div>

              {/* Shopping cart icon with item count */}
              <Link to="/cart" className="relative">
                <FaShoppingCart className="text-green-500 text-2xl sm:text-3xl cursor-pointer" />
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-1.5 py-0.5">
                  {context.cartItemCount}
                </span>
              </Link>

              <button
                onClick={handleLogout}
                className="bg-green-500 text-white px-2 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm hover:bg-green-600 hover:scale-105 hover:shadow-lg transition duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/signup"
                className="bg-green-500 text-white px-2 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm hover:bg-green-600 hover:scale-105 hover:shadow-lg transition duration-300"
              >
                Signup
              </Link>
              <Link
                to="/login"
                className="bg-green-500 text-white px-2 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm hover:bg-green-600 hover:scale-105 hover:shadow-lg transition duration-300"
              >
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;