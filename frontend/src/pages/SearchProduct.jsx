import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { axiosInstance, ApiCollection } from '../../../backend/common/axios.Config';
import SearchProductCard from '../components/SearchProductCard';

const SearchProduct = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get('query');

  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(
          `${ApiCollection.searchProducts.url}?query=${searchQuery}`
        );
        console.log('Search Results Response:', response.data);
        setSearchResults(response.data.data || []);
        setError(null);
      } catch (err) {
        setError('Failed to fetch search results. Please try again.');
        console.error('Search error:', err);
      } finally {
        setLoading(false);
      }
    };

    if (searchQuery) {
      fetchSearchResults();
    }
  }, [searchQuery]);

  // Group products by category
  const groupedProducts = searchResults.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {});

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold my-4">Search Results for "{searchQuery}"</h2>
      
      {loading && <p className="text-center py-4">Loading...</p>}
      
      {error && <p className="text-center py-4 text-red-500">{error}</p>}
      
      {!loading && !error && Object.keys(groupedProducts).length === 0 && (
        <p className="text-center py-4">No products found matching your search.</p>
      )}
      
      {!loading && !error && Object.keys(groupedProducts).length > 0 && (
        <div>
          {Object.entries(groupedProducts).map(([category, products]) => (
            <SearchProductCard key={category} category={category} products={products} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchProduct;
