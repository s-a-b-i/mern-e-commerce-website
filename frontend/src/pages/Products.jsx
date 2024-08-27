import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus } from "react-icons/fa";
import UploadProduct from "../components/Uploadproduct.jsx";
import { ProductSearchFilter } from "../components/ProductSearchFilter.jsx";
import { axiosInstance, ApiCollection } from "../../../backend/common/axios.Config.js";
import ProductCard from "../components/ProductCard.jsx";

const Products = () => {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(ApiCollection.allProducts.url);
      setProducts(response.data.data);
      setIsLoading(false);
    } catch (error) {
      setError(error.response?.data?.error || "An error occurred while fetching products");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [refreshTrigger]);

  const handleAddProduct = () => {
    setRefreshTrigger((prev) => prev + 1);
    setShowUploadModal(false);
  };

  const handleProductUpdate = (updatedProduct) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product._id === updatedProduct._id ? updatedProduct : product
      )
    );
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  const LoadingSpinner = () => (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-mint-500"></div>
    </div>
  );

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div className="text-center text-xl font-sans text-red-500">Error: {error}</div>;

  return (
    <div className="p-4 bg-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-teal-800 font-serif">Products</h1>
        <motion.button
          onClick={() => setShowUploadModal(true)}
          className="group flex items-center px-6 py-3 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-full hover:from-green-500 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            className="bg-white rounded-full p-2 mr-3"
            initial={{ rotate: 0 }}
            whileHover={{ rotate: 90 }}
          >
            <FaPlus className="text-green-500 group-hover:text-green-600 transition-colors duration-300" />
          </motion.div>
          <span className="font-semibold text-lg font-sans">Add Product</span>
        </motion.button>
      </div>

      <ProductSearchFilter onCategorySelect={handleCategorySelect} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8"
      >
        {filteredProducts.map((product) => (
          <ProductCard key={product._id} product={product} onProductUpdate={handleProductUpdate} />
        ))}
      </motion.div>

      <AnimatePresence>
        {showUploadModal && (
          <UploadProduct
            onClose={() => setShowUploadModal(false)}
            onUpload={handleAddProduct}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Products;
