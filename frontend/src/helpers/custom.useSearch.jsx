// useSearch.js
import { useState, useEffect, useCallback } from 'react';
import { axiosInstance, ApiCollection } from '.././utils/axios.Config';

export const useSearch = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  const fetchSuggestions = useCallback(async () => {
    if (query.length > 2) {
      setIsLoading(true);
      setError(null);
      try {
        console.log("Fetching suggestions for query:", query);
        const response = await axiosInstance.get(`${ApiCollection.searchSuggestions.url}?query=${query}`);
        console.log("Suggestions API response:", response.data);
        setSuggestions(response.data.data);
      } catch (error) {
        setError('Error fetching suggestions');
        console.error('Error fetching suggestions:', error.response || error);
      } finally {
        setIsLoading(false);
      }
    } else {
      setSuggestions([]);
    }
  }, [query]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchSuggestions();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [fetchSuggestions]);

  const fetchSearchHistory = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      console.log("Fetching search history");
      const response = await axiosInstance.get(ApiCollection.previousSearches.url);
      console.log("Search history response:", response.data);
      setSearchHistory(response.data.data);
    } catch (error) {
      setError('Error fetching search history');
      console.error('Error fetching search history:', error.response || error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addToSearchHistory = useCallback(async (searchQuery) => {
    try {
      console.log("Adding to search history:", searchQuery);
      const response = await axiosInstance.post(ApiCollection.previousSearches.url, { query: searchQuery });
      console.log("Add to search history response:", response.data);
      await fetchSearchHistory();
    } catch (error) {
      console.error('Error adding to search history:', error.response || error);
    }
  }, [fetchSearchHistory]);

  const deleteSearchHistoryItem = useCallback(async (itemId) => {
    if (!itemId) {
      console.error('Invalid item ID');
      return;
    }
    try {
      console.log("Deleting search history item with ID:", itemId);
      const response = await axiosInstance.delete(`${ApiCollection.previousSearches.url}/${itemId}`);
      console.log("Delete search history item response:", response.data);
      await fetchSearchHistory();
    } catch (error) {
      console.error('Error deleting search history item:', error.response || error);
    }
  }, [fetchSearchHistory]);


  const searchProducts = useCallback(async (searchQuery) => {
    setIsLoading(true);
    setError(null);
    try {
      console.log("Searching products for query:", searchQuery);
      const response = await axiosInstance.get(`${ApiCollection.searchProducts.url}?query=${searchQuery}`);
      console.log("Search products response:", response.data);
      setSearchResults(response.data.data);
    } catch (error) {
      setError('Error searching products');
      console.error('Error searching products:', error.response || error);
    } finally {
      setIsLoading(false);
    }
  }, []);


  return {
    query,
    setQuery,
    suggestions,
    searchHistory,
    isLoading,
    error,
    fetchSearchHistory,
    addToSearchHistory,
    deleteSearchHistoryItem,
    searchResults,
    searchProducts
  };
};