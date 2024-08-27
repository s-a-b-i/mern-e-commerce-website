import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Example image imports
import img1 from '../asset/banner/image-1.png';
import img2 from '../asset/banner/image-2.png';
import img3 from '../asset/banner/image-3.png';
import img4 from '../asset/banner/image-4.png';
import img5 from '../asset/banner/image-5.png';

const BannerProduct = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const bannerContent = [
    {
        "image": img1,
        "title": "Shoes Collection",
        "subtitle": "Discover our latest styles",
        "buttonText": "Shop Now"
    },
    {
        "image": img2,
        "title": "New Arrivals: Watches",
        "subtitle": "Be the first to get our fresh designs",
        "buttonText": "Explore"
    },
    {
        "image": img3,
        "title": "Airpods Collection",
        "subtitle": "Get ready for the cold weather",
        "buttonText": "Shop Now"
    },
    {
        "image": img4,
        "title": "Jacket Collection",
        "subtitle": "Get ready for the cold weather",
        "buttonText": "Shop Now"
    },
    {
      "image": img5,
      "title": "TV Collection",
      "subtitle": "Experience the best in entertainment",
      "buttonText": "Shop Now"
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerContent.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [bannerContent.length]);

  return (
    <div className="w-full py-4 sm:py-6 md:py-8 bg-mint-100">
      <div className="container mx-auto px-4">
        <div className="relative w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] overflow-hidden bg-gradient-to-r from-teal-400 to-mint-300 rounded-lg shadow-lg">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className="absolute inset-0 flex items-center justify-center md:justify-between"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Background image and overlay for small screens */}
              <div className="absolute inset-0 md:hidden">
                <div className="absolute inset-0 bg-black bg-opacity-40 z-10"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <img 
                    src={bannerContent[currentIndex].image}
                    alt={`Banner ${currentIndex + 1}`}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
              
              {/* Content for all screen sizes */}
              <div className="relative z-20 text-center md:text-left md:w-1/2 px-4 sm:px-6 md:px-8 lg:px-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3 md:mb-4 text-white">
                  {bannerContent[currentIndex].title}
                </h2>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-3 sm:mb-4 md:mb-6 text-white">
                  {bannerContent[currentIndex].subtitle}
                </p>
                <button className="px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 bg-white text-teal-600 rounded-full font-semibold text-sm sm:text-base md:text-lg hover:bg-teal-100 transition-colors">
                  {bannerContent[currentIndex].buttonText}
                </button>
              </div>

              {/* Image for larger screens */}
              <div className="hidden md:flex md:w-1/2 justify-center items-center">
                <div className="w-[250px] h-[250px] lg:w-[300px] lg:h-[300px] flex items-center justify-center">
                  <img 
                    src={bannerContent[currentIndex].image}
                    alt={`Banner ${currentIndex + 1}`}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 sm:space-x-3 z-30">
            {bannerContent.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 rounded-full transition-colors duration-300 ${
                  index === currentIndex ? 'bg-white' : 'bg-gray-400 hover:bg-gray-300'
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerProduct;