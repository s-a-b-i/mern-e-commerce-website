// controllers/product/product.getDetails.js

import { Product } from "../../models/product.model.js";
import { asynchandler } from "../../utils/asynchandler.js";

const getProductDetails = asynchandler(async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                error: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            data: product
        });
    } catch (error) {
        console.error("Error fetching product details:", error.message);
        res.status(error.statusCode || 500).json({
            success: false,
            error: error.message || "Internal Server Error"
        });
    }
});

export { getProductDetails };