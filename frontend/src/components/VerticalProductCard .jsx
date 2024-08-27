import React, { useState, useEffect, useRef, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchproductscertaincategory } from '../helpers/fetchproductscertaincategory.jsx';
import AddToCart from '../helpers/AddToCart.jsx';
import { FaChevronLeft, FaChevronRight, FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Context } from '../context/index.jsx';

const VerticalProductCard = ({ category }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showScrollHint, setShowScrollHint] = useState(true);
  const scrollRef = useRef(null);

  const { getCartItemCount } = useContext(Context);

  const handleAddToCart = async (e, productId) => {
    e.preventDefault();
    try {
      await AddToCart(e, productId);
      getCartItemCount(); // Update the cart count
      console.log('Added to cart:', productId);
    } catch (error) {
      console.error("Error adding to cart:", error);
      // You might want to show an error message to the user here
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await fetchproductscertaincategory(category);
        setProducts(data || []);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError(err.toString());
        setLoading(false);
      }
    };

    fetchProducts();

    const timer = setTimeout(() => {
      setShowScrollHint(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [category]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount = direction === 'left' ? -clientWidth : clientWidth;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (loading) return <p className="text-center py-4">Loading...</p>;
  if (error) return <p className="text-center py-4 text-red-500">Error: {error}</p>;
  if (!products.length) return <p className="text-center py-4">No products found for this category.</p>;

  return (
    <div className="p-3 sm:p-5 bg-mint-100 relative">
      <motion.h2 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-2xl sm:text-3xl text-center mb-4 sm:mb-6 text-gray-800 font-bold font-serif"
      >
        {category}
      </motion.h2>

      <AnimatePresence>
        {showScrollHint && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-center text-sm text-gray-600 mb-2 sm:hidden"
          >
            Scroll left or right to see more
          </motion.p>
        )}
      </AnimatePresence>

      <div className="relative">
        {products.length >= 4 && (
          <>
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 hidden sm:block" style={{ marginLeft: '-20px' }}>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => scroll('left')}
                className="bg-mint-500 bg-opacity-75 rounded-full p-3 focus:outline-none"
              >
                <FaChevronLeft className="text-white text-xl" />
              </motion.button>
            </div>

            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 hidden sm:block" style={{ marginRight: '-20px' }}>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => scroll('right')}
                className="bg-mint-500 bg-opacity-75 rounded-full p-3 focus:outline-none"
              >
                <FaChevronRight className="text-white text-xl" />
              </motion.button>
            </div>
          </>
        )}

        <div 
          ref={scrollRef}
          className="flex overflow-x-auto space-x-4 sm:space-x-6 pb-4 sm:pb-6 scrollbar-hide"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {products.map((product) => (
            <Link to={`/product/${product._id}`} key={product._id}>
              <motion.div 
                key={product._id}
                className="flex-shrink-0 w-[280px] sm:w-[350px] bg-gradient-to-b from-mint-200 to-white rounded-lg shadow-lg overflow-hidden border border-green-300"
                style={{ 
                  scrollSnapAlign: 'start',
                  boxShadow: '0 0 15px rgba(0, 204, 102, 0.3)'
                }}
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: '0 0 20px rgba(0, 204, 102, 0.5)'
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex flex-col h-full">
                  <div className="h-[160px] sm:h-[200px] bg-white overflow-hidden flex items-center justify-center py-4">
                    {product.images && product.images.length > 0 ? (
                      <img src={product.images[0]} alt={product.name} className="w-full h-full object-contain" />
                    ) : (
                      <div className="h-full flex items-center justify-center bg-mint-200 text-gray-500 text-xs sm:text-sm">No image</div>
                    )}
                  </div>
                  <div className="p-4 flex flex-col justify-between bg-transparent flex-grow">
                    <div>
                      <h3 className="text-sm sm:text-lg font-semibold text-green-700 mb-2 line-clamp-2">
                        {product.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600"><span className="font-bold">Category:</span> {category}</p>
                      <p className="text-xs sm:text-sm text-gray-600"><span className="font-bold">Price:</span> ₹{product.price}</p>
                      <p className="text-xs sm:text-sm text-green-500"><span className="font-bold">Sale:</span> ₹{product.sellingPrice}</p>
                    </div>
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="mt-2 sm:mt-4 bg-green-500 text-white py-1 sm:py-2 px-2 sm:px-4 rounded-md hover:bg-green-600 transition duration-300 font-sans text-xs sm:text-sm flex items-center justify-center"
                      onClick={(e) => handleAddToCart(e, product._id)}
                    >
                      <FaShoppingCart className="mr-2" />
                      Add to Cart
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VerticalProductCard;