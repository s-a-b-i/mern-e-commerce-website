import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaDollarSign, FaBoxOpen, FaEdit } from 'react-icons/fa';
import EditProduct from './EditProduct';

const ProductCard = ({ product, onProductUpdate }) => {
  const [showEditModal, setShowEditModal] = useState(false);

  const handleEditClick = () => {
    setShowEditModal(true);
  };

  const handleEditClose = () => {
    setShowEditModal(false);
  };

  const handleEditComplete = (updatedProduct) => {
    setShowEditModal(false);
    onProductUpdate(updatedProduct);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col"
        style={{
          width: '100%',
          maxWidth: '300px',
          height: '450px', // Fixed height for all cards
          boxShadow: '0 0 20px rgba(0, 200, 0, 0.3)',
          border: '2px solid #00c853',
        }}
      >
        <div className="relative aspect-w-4 aspect-h-3 overflow-hidden" style={{ height: '40%' }}>
          <img 
            src={product.images[0]} 
            alt={product.name} 
            className="w-full h-full object-contain"
          />
          <div className="absolute top-2 right-2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
            New
          </div>
        </div>
        
        <div className="p-4 bg-gradient-to-b from-green-50 to-white flex flex-col justify-between flex-grow">
          <div>
            <h2 className="text-lg font-bold mb-1 text-green-800 truncate">{product.name}</h2>
            <p className="text-green-600 mb-2 text-sm line-clamp-3 overflow-hidden">{product.description}</p>
            <p className="text-gray-700 text-sm mb-2">Brand: {product.brand}</p>
          </div>
          
          <div className="mt-auto">
            <div className="flex justify-between items-center w-full mb-2">
              <div className="flex items-center text-xl font-bold text-green-600">
                <FaDollarSign className="mr-1" />
                <span>{product.sellingPrice}</span>
              </div>
              <div className="text-xs text-gray-500 line-through">${product.price}</div>
            </div>
            
            <div className="flex items-center text-green-700 text-xs mb-3">
              <FaBoxOpen className="mr-1 text-green-500" />
              <span>{product.quantity} in stock</span>
            </div>
            
            <button 
              onClick={handleEditClick}
              className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors duration-200 flex items-center justify-center"
            >
              <FaEdit className="mr-2" />
              Edit Product
            </button>
          </div>
        </div>
      </motion.div>
      
      {showEditModal && (
        <EditProduct
          product={product}
          onClose={handleEditClose}
          onEdit={handleEditComplete}
        />
      )}
    </>
  );
};

export default ProductCard;