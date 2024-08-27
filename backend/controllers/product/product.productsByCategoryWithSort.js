import { asynchandler } from "../../utils/asynchandler.js";
import { Product } from "../../models/product.model.js";

export const getProductsByCategoryWithSort = asynchandler(async (req, res) => {
  try {
    const { category, sort } = req.query;

    if (!category) {
      return res.status(400).json({
        success: false,
        message: 'Category parameter is required',
      });
    }

    const sortOrder = sort === 'desc' ? -1 : 1;
    const categoryArray = category.split(','); // Split the category parameter into an array

    const products = await Product.find({ category: { $in: categoryArray } })
      .sort({ price: sortOrder })
      .select('name images price sellingPrice');

    if (!products.length) {
      return res.status(404).json({
        success: false,
        message: `No products found in category ${category}`,
      });
    }

    res.status(200).json({
      success: true,
      data: products,
      message: `Products in category ${category} fetched successfully`,
    });
  } catch (error) {
    console.error("Error fetching products by category with sort:", error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
});
