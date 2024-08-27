import { Product } from "../../models/product.model.js";
import { asynchandler } from "../../utils/asynchandler.js";

const getProducts = asynchandler(async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            data: products
        });
    } catch (error) {
        console.error("Error fetching products:", error.message);
        res.status(error.statusCode || 500).json({
            success: false,
            error: error.message || "Internal Server Error"
        });
    }
});

export { getProducts };
