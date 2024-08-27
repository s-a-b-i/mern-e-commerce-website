import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import { Context } from "./context/index.jsx";
import { setUserDetails } from "./store/userslice.jsx";
import { axiosInstance, ApiCollection } from "./utils/axios.Config.js";
function App() {
  const dispatch = useDispatch();
  const [cartItemCount, setCartItemCount] = useState(0);
  const { pathname } = useLocation();

  // Scroll to top effect
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const fetchUserDetails = async () => {
    try {
      const response = await axiosInstance.get(ApiCollection.currentUser.url);
      if (response.data) {
        dispatch(setUserDetails(response.data));
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log("User not logged in or session expired.");
      } else {
        console.error("Error fetching user details:", error);
      }
    }
  };

  const getCartItemCount = async () => {
    try {
      const response = await axiosInstance.get(ApiCollection.getCartItemCount.url);
      if (response.data.success) {
        setCartItemCount(response.data.count);
      } else {
        console.error('Failed to get cart item count:', response.data.error);
        setCartItemCount(0);
      }
    } catch (error) {
      console.error('Error getting cart item count:', error);
      setCartItemCount(0);
    } 
  };

  useEffect(() => {
    fetchUserDetails();
    getCartItemCount();
  }, [dispatch]);

  return (
    <>
      <Context.Provider value={{ fetchUserDetails, cartItemCount, getCartItemCount }}>
        <ToastContainer />
        <Header cartItemCount={cartItemCount} />
        <main className="min-h-[calc(100vh-5rem)] p-2 pt-20">
          <Outlet />
        </main>
        <Footer />
      </Context.Provider>
    </>
  );
}

export default App;