// components/CartView.jsx

import React, { useState, useEffect, useContext, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { axiosInstance, ApiCollection } from '.././utils/axios.Config.js';
import { Context } from '../context/index.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { FaTrash, FaMinus, FaPlus, FaShoppingBag } from 'react-icons/fa';

const CartView = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getCartItemCount } = useContext(Context);
  const navigate = useNavigate();
  const cartRef = useRef(null);

  useEffect(() => {
    fetchCart();
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(ApiCollection.viewCart.url);
      setCartItems(response.data.data.items);
    } catch (err) {
      setError('Error fetching cart. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId, action) => {
    const updatedItems = cartItems.map(item => {
      if (item.product._id === productId) {
        return {
          ...item,
          quantity: action === 'increment' ? item.quantity + 1 : Math.max(1, item.quantity - 1)
        };
      }
      return item;
    });
    setCartItems(updatedItems);

    try {
      await axiosInstance.patch(ApiCollection.updateCartItem.url, { productId, action });
      getCartItemCount();
    } catch (err) {
      setError('Error updating cart. Please try again.');
      fetchCart();
    }
  };

  const removeItem = async (productId) => {
    const updatedItems = cartItems.filter(item => item.product._id !== productId);
    setCartItems(updatedItems);

    try {
      await axiosInstance.delete(`${ApiCollection.removeCartItem.url}/${productId}`);
      getCartItemCount();
    } catch (err) {
      setError('Error removing item from cart. Please try again.');
      fetchCart();
    }
  };

  if (loading && cartItems.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, loop: Infinity, ease: "linear" }}
          className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full"
        />
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-10 text-red-500 font-bold">{error}</div>;
  }

  const total = cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

  return (
    <motion.div 
      ref={cartRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-4xl mx-auto p-4 mt-8 bg-gradient-to-b from-blue-100 to-white rounded-lg shadow-lg"
    >
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">Your Shopping Cart</h1>
      <AnimatePresence>
        {cartItems.length === 0 ? (
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center text-gray-500 text-lg"
          >
            Your cart is empty. <Link to="/" className="text-blue-500 hover:underline">Start shopping!</Link>
          </motion.p>
        ) : (
          <motion.div layout className="space-y-6">
            {cartItems.map((item) => (
              <motion.div 
                key={item.product._id} 
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex items-center bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <img 
                  src={item.product.images[0]} 
                  alt={item.product.name} 
                  className="w-24 h-24 object-cover rounded-md mr-4 cursor-pointer"
                  onClick={() => navigate(`/product/${item.product._id}`)}
                />
                <div className="flex-grow">
                  <h3 className="font-semibold text-lg text-blue-700 cursor-pointer" onClick={() => navigate(`/product/${item.product._id}`)}>{item.product.name}</h3>
                  <div className="flex items-center mt-2">
                    <motion.button 
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => updateQuantity(item.product._id, 'decrement')}
                      className="bg-blue-500 text-white p-2 rounded-full"
                    >
                      <FaMinus />
                    </motion.button>
                    <span className="px-4 py-1 bg-gray-100 mx-2 rounded-full">{item.quantity}</span>
                    <motion.button 
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => updateQuantity(item.product._id, 'increment')}
                      className="bg-blue-500 text-white p-2 rounded-full"
                    >
                      <FaPlus />
                    </motion.button>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">Price: ${item.price.toFixed(2)}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-lg text-green-600">${(item.price * item.quantity).toFixed(2)}</p>
                  <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => removeItem(item.product._id)}
                    className="text-red-500 mt-2 p-2 rounded-full hover:bg-red-100 transition-colors duration-300"
                  >
                    <FaTrash />
                  </motion.button>
                </div>
              </motion.div>
            ))}
            <motion.div 
              layout
              className="flex justify-between items-center pt-4 border-t-2 border-blue-200"
            >
              <span className="text-2xl font-semibold text-blue-800">Total:</span>
              <span className="text-2xl font-bold text-green-600">${total}</span>
            </motion.div>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-green-500 text-white py-3 px-4 rounded-md hover:bg-green-600 transition duration-300 text-lg font-semibold flex items-center justify-center"
            >
              <FaShoppingBag className="mr-2" />
              Proceed to Checkout
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CartView;