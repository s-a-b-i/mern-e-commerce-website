import { SearchHistory } from "../../models/searchHistory.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asynchandler } from "../../utils/asynchandler.js";


export const addToSearchHistory = asynchandler(async (req, res) => {
    if (!req.user) {
      throw new ApiError(401, "Authentication required");
    }
  
    const { query } = req.body;
  
    if (!query) {
      throw new ApiError(400, "Search query is required");
    }
  
    const newSearchHistory = await SearchHistory.create({
      userId: req.user._id,
      query
    });
  
    return res
      .status(201)
      .json(new ApiResponse(201, newSearchHistory, "Search history added successfully"));
  });