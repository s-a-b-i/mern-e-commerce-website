  // import { Product } from "../../models/product.model.js";
  // import { ApiError } from "../../utils/ApiError.js";
  // import { ApiResponse } from "../../utils/ApiResponse.js";
  // import { asynchandler } from "../../utils/asynchandler.js";

  // const searchProducts = asynchandler(async (req, res) => {
  //   const { query } = req.query;

  //   if (!query) {
  //     throw new ApiError(400, "Search query is required");
  //   }

  //   const products = await Product.find({
  //     $or: [
  //       { name: { $regex: query, $options: "i" } },
  //       { description: { $regex: query, $options: "i" } },
  //       { brand: { $regex: query, $options: "i" } },
  //       { category: { $regex: query, $options: "i" } },
  //     ],
  //   });

  //   if (products.length === 0) {
  //     return res
  //       .status(200)
  //       .json(new ApiResponse(200, [], "No products found matching the search query"));
  //   }

  //   return res
  //     .status(200)
  //     .json(new ApiResponse(200, products, "Products fetched successfully"));
  // });

  // export { searchProducts };