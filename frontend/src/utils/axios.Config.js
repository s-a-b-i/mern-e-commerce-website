import axios from 'axios';

const mainUrl = 'https://mern-e-commerce-website-ax3u.onrender.com/api/v1';

const axiosInstance = axios.create({
  baseURL: mainUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

const ApiCollection = {
  signUp: {
    url: '/users/signup',
    method: 'POST',
  },
  login: {
    url: '/users/login',
    method: 'POST',
  },
  currentUser: {
    url: '/users/userdetails',
    method: 'GET',
  },
  logout: {
    url: '/users/logout',
    method: 'GET',
  },
  allUsers: {
    url: '/users/allusers',
    method: 'GET',
  },
  updateUserDetails: {
    url: '/users/updateuser',
    method: 'PUT',
  },
  uploadProduct: {
    url: '/products/upload',
    method: 'POST',
  },
  allProducts: {
    url: '/products',
    method: 'GET',
  },
  editProduct: {
    url: '/products',
    method: 'PUT',
  },
  productsByCategory: {
    url: '/products/category',
    method: 'GET',
  },
  allProductsByCategory: {
    url: '/products/category',
    method: 'GET',
  },
  getProductDetails: {
    url: '/products/productdetails', // The actual ID will be appended in the API call
    method: 'GET',
  },
  productsByCategoryWithSort: {
    url: '/products/sort/category',
    method: 'GET',
  },
  addToCart: {
    url: '/cart/add',
    method: 'POST',
  },
  getCartItemCount: {
    url: '/cart/count',
    method: 'GET',
  },
  viewCart: {
    url: '/cart/view',
    method: 'GET',
  },
  updateCartItem: {
    url: '/cart/update',
    method: 'PATCH',
  },
  removeCartItem: {
    url: '/cart/remove',
    method: 'DELETE',
  },
  // Search routes
  searchProducts: {
    url: '/search/products',
    method: 'GET',
  },
  searchSuggestions: {
    url: '/search/suggestions',
    method: 'GET',
  },
  previousSearches: {
    url: '/search/history',
    method: 'GET',
  },
  addToSearchHistory: {
    url: '/search/history',
    method: 'POST',
  },
  deleteSearchHistoryItem: {
    url: '/search/history', // The actual ID will be appended in the API call
    method: 'DELETE',
  },
};

export { ApiCollection, axiosInstance };
