import { Product } from "../../models/product.model.js";
import { asynchandler } from "../../utils/asynchandler.js";



const updateProduct = asynchandler(async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const product = await Product.findByIdAndUpdate(id, updates, { new: true });
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
        console.error("Error updating product:", error.message);
        res.status(error.statusCode || 500).json({
            success: false,
            error: error.message || "Internal Server Error"
        });
    }
});

export {  updateProduct };