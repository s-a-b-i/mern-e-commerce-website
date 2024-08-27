
import { SearchHistory } from "../../models/searchHistory.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asynchandler } from "../../utils/asynchandler.js";

export const getPreviousSearches = asynchandler(async (req, res) => {
  if (!req.user) {
    throw new ApiError(401, "Authentication required");
  }

  const previousSearches = await SearchHistory.find({ userId: req.user._id })
    .sort({ timestamp: -1 })
    .limit(10)
    .select("_id query timestamp"); // Make sure to include _id in the selection

  return res
    .status(200)
    .json(new ApiResponse(200, previousSearches, "Previous searches fetched successfully"));
});
