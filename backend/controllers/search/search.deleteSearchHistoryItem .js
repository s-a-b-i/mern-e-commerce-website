// controllers/search/search.deleteSearchHistoryItem.js
import { SearchHistory } from "../../models/searchHistory.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asynchandler } from "../../utils/asynchandler.js";

export const deleteSearchHistoryItem = asynchandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new ApiError(400, "Search history item ID is required");
  }

  console.log("Attempting to delete search history item with ID:", id);

  const deletedItem = await SearchHistory.findOneAndDelete({
    _id: id,
    userId: req.user._id
  });

  if (!deletedItem) {
    console.log("No item found with ID:", id);
    throw new ApiError(404, "Search history item not found");
  }

  console.log("Successfully deleted search history item:", deletedItem);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Search history item deleted successfully"));
});