import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { axiosInstance, ApiCollection } from '.././utils/axios.Config.js';

const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-mint-500"></div>
  </div>
);

const CategoryList = () => {
  const [categoriesWithProducts, setCategoriesWithProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get(ApiCollection.productsByCategory.url);
        setCategoriesWithProducts(response.data.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.error || 'An error occurred');
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const scroll = (scrollOffset) => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += scrollOffset;
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-center py-8 text-xl font-sans text-red-500">Error: {error}</div>;

  return (
    <div className="w-full py-8 bg-mint-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-teal-800 text-center font-serif">
          Explore Our Categories
        </h2>
        <p className="text-center text-lg md:text-xl lg:text-2xl text-teal-600 mb-8 font-sans">
          Discover a world of products tailored to your needs
        </p>
        <div className="relative">
          <button 
            onClick={() => scroll(-400)} 
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-mint-500 p-3 rounded-full shadow-lg z-10 focus:outline-none hover:bg-mint-600 transition duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            onClick={() => scroll(400)} 
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-mint-500 p-3 rounded-full shadow-lg z-10 focus:outline-none hover:bg-mint-600 transition duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <motion.div
            ref={scrollRef}
            className="flex overflow-x-auto space-x-8 py-6 scroll-smooth scrollbar-hide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {categoriesWithProducts?.map(({ category, sampleProduct }) => (
              <Link 
                key={category}
                to={`/productCategory/${category}`}
                className="flex flex-col items-center w-40 sm:w-48 md:w-56 lg:w-64 group"
              >
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg mb-3 border-3 border-mint-200 overflow-hidden transition-transform duration-300 transform group-hover:scale-110">
                  {sampleProduct && (
                    <div className="w-20 h-20 flex items-center justify-center">
                      <img 
                        src={sampleProduct.images[0]} 
                        alt={category}
                        className="max-w-full max-h-full object-contain transition-opacity duration-300 group-hover:opacity-80"
                      />
                    </div>
                  )}
                </div>
                <p className="text-center text-lg font-medium text-gray-800 font-sans group-hover:text-teal-600 transition-colors duration-300">{category}</p>
              </Link>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CategoryList;