import { Product } from "../../models/product.model.js";
import { asynchandler } from "../../utils/asynchandler.js";

const getSingleProductByCtaegory = asynchandler(async (req, res) => {
    try {
        const availableCategories = await Product.distinct('category');
        // console.log("Available categories:", availableCategories);   

        const categoriesWithSampleProducts = await Promise.all(availableCategories.map(async (category) => {
            const sampleProduct = await Product.findOne({ category: category }).select('name images price sellingPrice');
            return {
                category,
                sampleProduct
            };
        }));

        res.status(200).json({
            success: true,
            data: categoriesWithSampleProducts,
            message: "Categories with sample products fetched successfully"
        });
    } catch (error) {
        console.error("Error fetching categories:", error.message);
        res.status(error.statusCode || 500).json({
            success: false,
            error: error.message || "Internal Server Error"
        });
    }
});

export { getSingleProductByCtaegory };