import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearch } from '../helpers/custom.useSearch'; // Adjust the import path if necessary

const SearchBar = () => {
  const {
    query,
    setQuery,
    suggestions,
    searchHistory,
    isLoading,
    error,
    fetchSearchHistory,
    addToSearchHistory,
    deleteSearchHistoryItem,
    searchProducts
  } = useSearch();

  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const searchBarRef = useRef(null);

  useEffect(() => {
    console.log("Initializing SearchBar");
    fetchSearchHistory();
    const handleClickOutside = (event) => {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
        console.log("Clicked outside search bar, hiding dropdown");
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [fetchSearchHistory]);

  const handleSearch = async (searchQuery) => {
    console.log("Handling search for query:", searchQuery);
    await searchProducts(searchQuery);
    navigate(`/search?query=${searchQuery}`);
    setQuery('');
    await addToSearchHistory(searchQuery);
  };


  const handleInputChange = (e) => {
    console.log("Input changed:", e.target.value);
    setQuery(e.target.value);
    setShowDropdown(true);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      console.log("Enter key pressed, searching for:", query);
      handleSearch(query);
    }
  };

  return (
    <div className="relative w-full max-w-xl" ref={searchBarRef}>
      <motion.div 
        className="flex items-center border-2 border-green-500 rounded-full overflow-hidden bg-white shadow-md"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          onFocus={() => {
            console.log("Search input focused");
            setShowDropdown(true);
          }}
          placeholder="Search products..."
          className="w-full px-6 py-3 focus:outline-none text-lg"
          aria-label="Search products"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleSearch(query)}
          className="px-6 py-3 bg-green-500 text-white hover:bg-green-600 transition duration-300 text-lg"
          aria-label="Search"
        >
          <FaSearch />
        </motion.button>
      </motion.div>
      
      <AnimatePresence>
        {showDropdown && (suggestions.length > 0 || searchHistory.length > 0) && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-10 w-full mt-2 bg-white border-2 border-green-500 rounded-lg shadow-lg max-h-80 overflow-y-auto"
          >
            {isLoading && <div className="p-4 text-center">Loading...</div>}
            {error && <div className="p-4 text-center text-red-500">{error}</div>}
            
            {suggestions.length > 0 && (
              <div className="p-4">
                <h3 className="text-md font-semibold text-green-700 mb-2">Suggestions:</h3>
                {suggestions.map((suggestion, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ backgroundColor: '#f0fff4', x: 5 }}
                    className="px-3 py-2 cursor-pointer text-md rounded transition duration-300"
                    onClick={() => {
                      console.log("Suggestion clicked:", suggestion);
                      handleSearch(suggestion);
                    }}
                  >
                    {suggestion}
                  </motion.div>
                ))}
              </div>
            )}
            
            {searchHistory.length > 0 && (
              <div className="p-4 border-t-2 border-green-200">
                <h3 className="text-md font-semibold text-green-700 mb-2">Recent Searches:</h3>
                <div className="flex flex-wrap gap-2">
                  {searchHistory.map((item) => (
                    <motion.div 
                      key={item._id}
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center bg-green-100 rounded-full px-4 py-2 text-md"
                    >
                      <span 
                        className="cursor-pointer text-green-800"
                        onClick={() => {
                          console.log("Search history item clicked:", item);
                          handleSearch(item.query);
                        }}
                      >
                        {item.query}
                      </span>
                      <motion.button
                        whileHover={{ scale: 1.1, color: '#e53e3e' }}
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log("Delete button clicked for item:", item);
                          if (item._id) {
                            deleteSearchHistoryItem(item._id);
                          } else {
                            console.error('Search history item has no _id:', item);
                          }
                        }}
                        className="ml-2 text-green-600 hover:text-red-600"
                        aria-label={`Remove ${item.query} from search history`}
                      >
                        <FaTimes size={14} />
                      </motion.button>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;
