import React, { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { axiosInstance, ApiCollection } from '../../../backend/common/axios.Config.js';
import { FaShoppingCart, FaFilter, FaSort } from 'react-icons/fa';
import AddToCart from '../helpers/AddToCart.jsx';
import { Context } from '../context/index.jsx';

const CategoryProduct = () => {
  const location = useLocation();
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { getCartItemCount } = useContext(Context);

  useEffect(() => {
    const fetchCategoriesAndProducts = async () => {
      try {
        const response = await axiosInstance.get(ApiCollection.allProductsByCategory.url);
        setCategories(response.data.data);

        const categoryFromUrl = location.pathname.split('/')[2];
        setSelectedCategories([categoryFromUrl]);

        const productsResponse = await axiosInstance.get(ApiCollection.productsByCategoryWithSort.url, {
          params: { category: categoryFromUrl, sort: sortOrder },
        });
        setProducts(productsResponse.data.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching categories and products:", err);
        setError('Failed to fetch categories and products');
        setLoading(false);
      }
    };

    fetchCategoriesAndProducts();
  }, [location.pathname, sortOrder]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get(ApiCollection.productsByCategoryWithSort.url, {
          params: { category: selectedCategories.join(','), sort: sortOrder },
        });
        setProducts(response.data.data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError('Failed to fetch products');
      }
    };

    if (selectedCategories.length > 0) {
      fetchProducts();
    }
  }, [selectedCategories, sortOrder]);

  const handleCheckboxChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleAddToCart = async (e, productId) => {
    e.preventDefault();
    try {
      await AddToCart(e, productId);
      getCartItemCount();
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  if (loading) return <div className="text-center py-4">Loading...</div>;
  if (error) return <div className="text-center py-4 text-red-500">{error}</div>;
  if (!categories.length) return <div className="text-center py-4">No categories found.</div>;
  if (!products.length && selectedCategories.length > 0) return <div className="text-center py-4">No products found for these categories.</div>;

  return (
    <div className="flex flex-col md:flex-row p-4 bg-gradient-to-b from-mint-100 to-mint-200 min-h-screen">
      <div className="md:w-1/4 p-4 bg-white shadow-lg rounded-lg h-full">
        <h3 className="text-2xl font-bold mb-4 text-green-600">
          <FaFilter className="inline-block mr-2 text-green-400" />
          Filter & Sort
        </h3>
        <div className="mb-4 h-[calc(100%-6rem)] overflow-y-auto">
          <h4 className="text-lg font-semibold mb-2 text-green-500">Categories</h4>
          {categories.map((category) => (
            <div key={category.category} className="flex items-center mb-2">
              <motion.input
                type="checkbox"
                id={`category-${category.category}`}
                className="mr-2 cursor-pointer"
                checked={selectedCategories.includes(category.category)}
                onChange={() => handleCheckboxChange(category.category)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              />
              <label
                htmlFor={`category-${category.category}`}
                className="text-sm cursor-pointer hover:text-green-600 transition-colors"
              >
                {category.category}
              </label>
            </div>
          ))}
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-2 text-green-500">
            <FaSort className="inline-block mr-2 text-green-400" />
            Sort By Price
          </h4>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="w-full p-2 border border-green-300 rounded-lg bg-white text-green-700 font-medium"
          >
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="md:w-3/4 p-4">
        <h2 className="text-3xl font-bold mb-4 text-green-700">
          Products in {selectedCategories.join(', ')}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <Link to={`/product/${product._id}`} key={product._id}>
              <motion.div
                className="bg-gradient-to-b from-mint-200 to-white rounded-lg shadow-lg overflow-hidden border border-green-300"
                style={{ boxShadow: '0 0 15px rgba(0, 204, 102, 0.3)' }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 0 20px rgba(0, 204, 102, 0.5)',
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex flex-col h-full">
                  <div className="h-[160px] sm:h-[200px] bg-white overflow-hidden flex items-center justify-center py-4">
                    {product.images && product.images.length > 0 ? (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="h-full flex items-center justify-center bg-mint-200 text-gray-500 text-xs sm:text-sm">
                        No image
                      </div>
                    )}
                  </div>
                  <div className="p-4 flex flex-col justify-between bg-transparent flex-grow">
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-green-700 mb-2 line-clamp-2">
                        {product.name}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600">
                        <span className="font-medium text-green-600">Category:</span> {selectedCategories.join(', ')}
                      </p>
                      <p className="text-sm sm:text-base text-gray-600">
                        <span className="font-medium text-green-600">Price:</span> ₹{product.price}
                      </p>
                      <p className="text-sm sm:text-base text-green-500">
                        <span className="font-medium">Sale:</span> ₹{product.sellingPrice}
                      </p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="mt-2 sm:mt-4 bg-green-500 text-white py-1 sm:py-2 px-2 sm:px-4 rounded-md hover:bg-green-600 transition duration-300 font-sans text-sm sm:text-base flex items-center justify-center"
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

export default CategoryProduct;