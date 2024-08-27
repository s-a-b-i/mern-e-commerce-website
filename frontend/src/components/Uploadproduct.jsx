import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaTimes, FaBox, FaTags, FaDollarSign, FaInfoCircle } from 'react-icons/fa';
import { ProductCategories } from '../helpers/ProductCategories.jsx';
import UploadImage from '../helpers/UploadImage.jsx';
import { toast } from 'react-toastify';
import { axiosInstance, ApiCollection } from '.././utils/axios.Config.js';

const UploadProduct = ({ onClose, onUpload, editProduct = null }) => {
  const [productData, setProductData] = useState({
    name: '',
    brand: '',
    category: '',
    description: '',
    price: '',
    sellingPrice: '',
    quantity: '',
    images: []
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (editProduct) {
      setProductData(editProduct);
    }
  }, [editProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData(prev => ({ ...prev, [name]: value }));
  };

  const handleImagesUpload = (imageUrls) => {
    setProductData(prev => ({ ...prev, images: imageUrls }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
  
    try {
      let response;
      if (editProduct) {
        response = await axiosInstance.put(`${ApiCollection.editProduct.url}/${editProduct._id}`, productData);
      } else {
        response = await axiosInstance.post(ApiCollection.uploadProduct.url, productData);
      }

      if (response.data.success) {
        toast.success(`Product ${editProduct ? 'updated' : 'added'} successfully`, {
          position: 'top-center',
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        onUpload(response.data.data);
      } else {
        throw new Error(`Failed to ${editProduct ? 'update' : 'add'} product`);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || `An error occurred while ${editProduct ? 'updating' : 'uploading'} the product`;
      toast.error(errorMessage, {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.error(`Error ${editProduct ? 'updating' : 'uploading'} product:`, errorMessage);
    } finally {
      setIsLoading(false);
      onClose();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl relative flex flex-col max-h-[90vh]"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors duration-200 z-10"
        >
          <FaTimes size={24} />
        </button>
        <h2 className="text-3xl font-bold p-6 text-center text-green-600 border-b bg-gray-50 rounded-t-3xl">
          {editProduct ? 'Edit Product' : 'Add New Product'}
        </h2>
        
        <div className="overflow-y-auto flex-grow px-6 py-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <InputField icon={<FaBox />} name="name" value={productData.name} onChange={handleChange} placeholder="Product Name" />
            <InputField icon={<FaTags />} name="brand" value={productData.brand} onChange={handleChange} placeholder="Brand Name" />
            <SelectField icon={<FaTags />} name="category" value={productData.category} onChange={handleChange} options={ProductCategories} />
            <TextareaField icon={<FaInfoCircle />} name="description" value={productData.description} onChange={handleChange} placeholder="Product Description" />
            <InputField icon={<FaDollarSign />} name="price" value={productData.price} onChange={handleChange} placeholder="Cost Price" type="number" />
            <InputField icon={<FaDollarSign />} name="sellingPrice" value={productData.sellingPrice} onChange={handleChange} placeholder="Selling Price" type="number" />
            <InputField icon={<FaBox />} name="quantity" value={productData.quantity} onChange={handleChange} placeholder="Quantity" type="number" />
            <UploadImage onImagesUpload={handleImagesUpload} initialImages={productData.images} />
          </form>
        </div>
        
        <div className="border-t p-4 flex justify-end space-x-4 bg-gray-50 rounded-b-3xl">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition duration-300"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition duration-300 disabled:bg-green-300"
            disabled={isLoading}
          >
            {isLoading ? (editProduct ? 'Updating...' : 'Adding...') : (editProduct ? 'Update Product' : 'Add Product')}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const InputField = ({ icon, name, value, onChange, placeholder, type = "text" }) => (
  <div className="relative">
    <div className="absolute top-3 left-3 text-green-500">{icon}</div>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full pl-10 pr-3 py-2 border-2 border-green-300 rounded-full focus:ring-2 focus:ring-green-500 focus:border-transparent"
      placeholder={placeholder}
      required
    />
  </div>
);

const SelectField = ({ icon, name, value, onChange, options }) => (
  <div className="relative">
    <div className="absolute top-3 left-3 text-green-500">{icon}</div>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full pl-10 pr-3 py-2 border-2 border-green-300 rounded-full focus:ring-2 focus:ring-green-500 focus:border-transparent"
      required
    >
      <option value="">Select a category</option>
      {options.map((category) => (
        <option key={category.id} value={category.value}>
          {category.label}
        </option>
      ))}
    </select>
  </div>
);

const TextareaField = ({ icon, name, value, onChange, placeholder }) => (
  <div className="relative">
    <div className="absolute top-3 left-3 text-green-500">{icon}</div>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      className="w-full pl-10 pr-3 py-2 border-2 border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
      placeholder={placeholder}
      rows="3"
      required
    />
  </div>
);

export default UploadProduct;