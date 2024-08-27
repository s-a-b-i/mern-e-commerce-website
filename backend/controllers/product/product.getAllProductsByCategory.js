import { Product } from "../../models/product.model.js";
import { asynchandler } from "../../utils/asynchandler.js";

const getAllProductsByCategory = asynchandler(async (req, res) => {
    try {
      const { category } = req.params;
      const products = await Product.find({ category }).select('name images price sellingPrice');
      
      if (!products.length) {
        return res.status(404).json({
          success: false,
          message: `No products found in category ${category}`
        });
      }
  
      res.status(200).json({
        success: true,
        data: products,
        message: `Products in category ${category} fetched successfully`
      });
    } catch (error) {
      console.error("Error fetching products by category:", error);
      res.status(500).json({
        success: false,
        error: "Internal Server Error"
      });
    }
  });
export { getAllProductsByCategory };
