import { Product } from "../../models/product.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asynchandler } from "../../utils/asynchandler.js";

// Utility function to escape special characters for regex
const escapeRegex = (string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // Escape special characters
};

export const getSearchSuggestions = asynchandler(async (req, res) => {
  const { query } = req.query;

  // console.log("Received query:", query);

  if (!query) {
    throw new ApiError(400, "Search query is required");
  }

  const escapedQuery = escapeRegex(query);

  const suggestions = await Product.aggregate([
    {
      $match: {
        $or: [
          { name: { $regex: escapedQuery, $options: "i" } },
          { brand: { $regex: escapedQuery, $options: "i" } },
          { category: { $regex: escapedQuery, $options: "i" } },
          { description: { $regex: escapedQuery, $options: "i" } }
        ],
      },
    },
    {
      $group: {
        _id: null,
        names: { $addToSet: "$name" },
        brands: { $addToSet: "$brand" },
        categories: { $addToSet: "$category" },
      },
    },
    {
      $project: {
        _id: 0,
        suggestions: {
          $concatArrays: ["$names", "$brands", "$categories"],
        },
      },
    },
  ]);

  // console.log("Aggregation results:", suggestions);

  const uniqueSuggestions = suggestions.length > 0 ? [...new Set(suggestions[0].suggestions)] : [];

  // console.log("Unique suggestions:", uniqueSuggestions);

  return res
    .status(200)
    .json(new ApiResponse(200, uniqueSuggestions, "Search suggestions fetched successfully"));
});
