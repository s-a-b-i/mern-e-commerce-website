import React, { useState, useEffect, useContext } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { axiosInstance, ApiCollection } from '.././utils/axios.Config.js';
import { FaShoppingCart, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { motion } from 'framer-motion';
import MagnifyingGlass from './MagnifyingGlass.jsx';
import RecommendedProducts from './ReccomendedProducts.jsx';
import AddToCart from '../helpers/AddToCart.jsx';
import  BuyNow  from '../helpers/BuyNow.jsx';
import { Context } from '../context/index.jsx';

const ProductDetailsCard = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showDetails, setShowDetails] = useState(false);

  const { getCartItemCount } = useContext(Context);

  const handleAddToCart = async (e) => {
    try {
      await AddToCart(e, product._id);
      getCartItemCount(); // Update the cart count
      console.log('Added to cart:', product.name);
    } catch (error) {
      console.error("Error adding to cart:", error);
      // You might want to show an error message to the user here
    }
  };

  const handleBuyNow = async () => {
    try {
      await BuyNow(product._id, navigate);
      getCartItemCount(); // Update the cart count
    } catch (error) {
      console.error("Error adding to cart:", error);
      // You might want to show an error message to the user here
    }
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axiosInstance.get(`${ApiCollection.getProductDetails.url}/${id}`);
        setProduct(response.data.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.error || 'An error occurred while fetching product details');
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  if (loading) return <div className="w-full py-8 text-center text-mint-500">Loading...</div>;
  if (error) return <div className="w-full py-8 text-center text-red-500">{error}</div>;
  if (!product) return <div className="w-full py-8 text-center text-mint-500">Product not found</div>;

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  return (
    <div className="flex flex-col min-h-screen bg-mint-100 p-4 mt-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='w-full max-w-6xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden border-4 border-mint-200'
      >
        {/* Image and Details Section */}
        <div className="md:flex">
          {/* Image Section */}
          <div className="md:w-1/2 p-6 bg-mint-100 relative">
            <div className="relative w-full pb-[100%] mb-4 bg-white rounded-lg shadow-md overflow-hidden">
              <div className="absolute inset-0">
                <MagnifyingGlass src={product.images[selectedImage]} />
              </div>
              <button onClick={prevImage} className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-mint-500 text-white rounded-full p-2 shadow-md hover:bg-mint-600 transition duration-300 z-10">
                <FaChevronLeft />
              </button>
              <button onClick={nextImage} className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-mint-500 text-white rounded-full p-2 shadow-md hover:bg-mint-600 transition duration-300 z-10">
                <FaChevronRight />
              </button>
            </div>
            <div className="flex justify-center mb-4 space-x-2 overflow-x-auto">
              {product.images.map((img, index) => (
                <img 
                  key={index}
                  src={img} 
                  alt={`${product.name} - ${index + 1}`}
                  className={`w-16 h-16 object-cover cursor-pointer rounded-md ${selectedImage === index ? 'border-2 border-mint-500' : 'border border-mint-200'}`}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </div>
          </div>

          {/* Details Section */}
          <div className="md:w-1/2 p-6 bg-white">
            <h2 className="text-3xl font-semibold mb-4 text-mint-600">{product.name}</h2>
            <div className="flex items-center mb-4">
              <p className="text-2xl font-bold text-mint-500 mr-2">${product.sellingPrice.toFixed(2)}</p>
              {product.price !== product.sellingPrice && (
                <p className="text-lg text-gray-400 line-through">${product.price.toFixed(2)}</p>
              )}
            </div>
            <p className="text-lg mb-4">
              Availability: 
              <span className={product.quantity > 0 ? 'text-mint-500 font-semibold ml-2' : 'text-red-600 font-semibold ml-2'}>
                {product.quantity > 0 ? 'In Stock' : 'Out of Stock'}
              </span>
            </p>
            <div className="mb-6 bg-mint-100 p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-mint-600">Description:</h3>
              <p className="text-gray-700">{product.description}</p>
            </div>
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2 text-mint-600">Details:</h3>
              <p className="text-gray-700">Brand: <span className="font-semibold">{product.brand}</span></p>
              <p className="text-gray-700">Category: <span className="font-semibold">{product.category}</span></p>
            </div>
            <button 
              onClick={() => setShowDetails(!showDetails)}
              className="text-mint-500 underline mb-4 block hover:text-mint-600 transition duration-300"
            >
              {showDetails ? 'Hide More Details' : 'Show More Details'}
            </button>
            {showDetails && (
              <div className="mb-6 bg-mint-100 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2 text-mint-600">Additional Information:</h3>
                <p className="text-gray-700">Weight: 0.5 kg</p>
                <p className="text-gray-700">Dimensions: 10 x 5 x 2 cm</p>
              </div>
            )}
            <div className="flex flex-col space-y-4">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-mint-500 text-white py-3 px-6 rounded-full hover:bg-mint-600 transition duration-300 flex items-center justify-center text-lg shadow-md"
                onClick={handleBuyNow}
                disabled={product.quantity === 0}
              >
                Buy Now
              </motion.button>
              <div className="flex space-x-4">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 bg-white text-mint-500 border-2 border-mint-500 py-3 px-6 rounded-full hover:bg-mint-100 transition duration-300 flex items-center justify-center text-lg shadow-md"
                  onClick={(e) => handleAddToCart(e, product?._id)}
                  disabled={product.quantity === 0}
                >
                  <FaShoppingCart className="mr-2" />
                  Add to Cart
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Recommended Products Section */}
      <div className="mt-8">
        <RecommendedProducts category={product.category} />
      </div>
    </div>
  );
};

export default ProductDetailsCard;