import { ApiCollection, axiosInstance } from '.././utils/axios.Config.js';
import { toast } from 'react-toastify';

const BuyNow = async (productId, navigate) => {
  try {
    const response = await axiosInstance.post(ApiCollection.addToCart.url, { productId, quantity: 1 });

    if (response.data.success) {
      toast.success(response.data.message || "Product added to cart successfully", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      navigate('/cart'); // Redirect to the cart page
    } else {
      toast.error(response.data.error || 'Failed to add product to cart');
    }
  } catch (error) {
    console.error('Error adding product to cart:', error);
    
    if (error.response) {
      // Handle specific status codes and error messages
      if (error.response.status === 401) {
        toast.info('Login or sign up first to use cart', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else if (error.response.status === 400) {
        // Check if the error message indicates the item is already in the cart
        const errorMessage = error.response.data.error || 'Failed to add product to cart';
        toast.info(errorMessage, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        toast.error('Error adding product to cart: ' + (error.response?.data?.error || error.message));
      }
    } else {
      toast.error('Error adding product to cart: ' + error.message);
    }
  }
};

export default BuyNow;