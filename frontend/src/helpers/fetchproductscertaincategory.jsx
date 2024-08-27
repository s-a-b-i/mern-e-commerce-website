import { axiosInstance, ApiCollection } from '../utils/axios.Config.js';

export const fetchproductscertaincategory = async (category) => {
  if (!category) {
    throw new Error("Category is required");
  }
  try {
    console.log(`Fetching from URL: ${ApiCollection.productsByCategory.url}/${category}`);
    const response = await axiosInstance.get(`${ApiCollection.productsByCategory.url}/${category}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};