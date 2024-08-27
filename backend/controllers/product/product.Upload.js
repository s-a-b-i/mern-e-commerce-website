import { ApiError } from "../../utils/ApiError.js";
import { Product } from "../../models/product.model.js";
import { asynchandler } from "../../utils/asynchandler.js";

const uploadProduct = asynchandler(async (req, res) => {
    const { name, brand, category, description, price, sellingPrice, quantity, images } = req.body;

    // Convert non-array fields to strings and trim
    const fields = { name, brand, category, description, price, sellingPrice, quantity };
    for (const key in fields) {
        if (fields[key] == null || fields[key].toString().trim() === "") {
            throw new ApiError(400, "All fields are required");
        }
        fields[key] = fields[key].toString().trim();
    }

    // Check images array
    if (!Array.isArray(images) || images.length === 0) {
        throw new ApiError(400, "Images are required");
    }

    try {
        const newProduct = await Product.create({
            ...fields,
            images
        });

        res.status(201).json({
            success: true,
            data: newProduct,
            message: "Product uploaded successfully"
        });
    } catch (error) {
        console.error("Error uploading product:", error.message);
        res.status(error.statusCode || 500).json({
            success: false,
            error: error.message || "Internal Server Error"
        });
    }
});

export { uploadProduct };
