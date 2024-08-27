import { Product } from "../../models/product.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asynchandler } from "../../utils/asynchandler.js";

// Utility function to escape special characters for regex
const escapeRegex = (string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // Escape special characters
};

export const searchProducts = asynchandler(async (req, res) => {
  const { query } = req.query;

  if (!query) {
    throw new ApiError(400, "Search query is required");
  }

  console.log("Searching for products with query:", query);

  const escapedQuery = escapeRegex(query);

  const products = await Product.find({
    $or: [
      { name: { $regex: escapedQuery, $options: "i" } },
      { description: { $regex: escapedQuery, $options: "i" } },
      { brand: { $regex: escapedQuery, $options: "i" } },
      { category: { $regex: escapedQuery, $options: "i" } },
    ],
  });

  console.log("Found products:", products.length);

  if (products.length === 0) {
    return res
      .status(200)
      .json(new ApiResponse(200, [], "No products found matching the search query"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, products, "Products fetched successfully"));
});
