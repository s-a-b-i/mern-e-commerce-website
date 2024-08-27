import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { fetchproductscertaincategory } from '../helpers/fetchproductscertaincategory';
import AddToCart from '../helpers/AddToCart';
import { FaShoppingCart, FaLeaf } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Context } from '../context/index';

const SearchProductCard = ({ category, products }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { getCartItemCount } = useContext(Context);

  const handleAddToCart = async (e, productId) => {
    e.preventDefault();
    try {
      await AddToCart(e, productId);
      getCartItemCount();
      console.log('Added to cart:', productId);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  if (loading) return <p className="text-center py-4">Loading...</p>;
  if (error) return <p className="text-center py-4 text-red-500">Error: {error}</p>;
  if (!products || products.length === 0) return null;

  return (
    <div className="p-6 sm:p-8 bg-gradient-to-br from-mint-50 to-green-100">
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl sm:text-4xl text-green-800 font-bold font-serif mb-2 relative inline-block">
          {category}
          <motion.span
            className="absolute bottom-0 left-0 w-full h-1 bg-green-500"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
        </h2>
        <p className="text-lg text-gray-600 mt-2">
          Total Products: <span className="font-bold text-green-700">{products.length}</span>
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link to={`/product/${product._id}`} key={product._id}>
            <motion.div 
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-green-200 transition-all duration-300 hover:shadow-2xl"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            >
              <div className="h-48 sm:h-56 bg-mint-50 overflow-hidden flex items-center justify-center p-4 relative">
                {product.images && product.images.length > 0 ? (
                  <img src={product.images[0]} alt={product.name} className="w-full h-full object-contain" />
                ) : (
                  <div className="h-full flex items-center justify-center bg-mint-200 text-gray-500 text-sm">No image</div>
                )}
                <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold py-1 px-2 rounded-full">
                  {((product.price - product.sellingPrice) / product.price * 100).toFixed(0)}% OFF
                </div>
              </div>
              <div className="p-4 flex flex-col justify-between bg-transparent flex-grow">
                <div>
                  <h3 className="text-lg font-semibold text-green-800 mb-2 line-clamp-2 hover:text-green-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-1"><FaLeaf className="inline mr-1 text-green-500" /> {category}</p>
                  <p className="text-sm text-gray-500 line-through">₹{product.price}</p>
                  <p className="text-lg font-bold text-green-600">₹{product.sellingPrice}</p>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-4 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300 font-sans text-sm flex items-center justify-center"
                  onClick={(e) => handleAddToCart(e, product._id)}
                >
                  <FaShoppingCart className="mr-2" />
                  Add to Cart
                </motion.button>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SearchProductCard;