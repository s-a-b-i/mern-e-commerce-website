import { Product } from "../../models/product.model.js";
import { Cart } from "../../models/cart.model.js";
import { asynchandler } from "../../utils/asynchandler.js";
import { ApiError } from "../../utils/ApiError.js";

export const addToCart = asynchandler(async (req, res) => {
    const { productId, quantity = 1 } = req.body;
    const userId = req.user._id;

    try {
        // Use $lookup to reduce the number of queries if necessary
        const [product, cart] = await Promise.all([
            Product.findById(productId).exec(),
            Cart.findOne({ user: userId }).exec()
        ]);

        if (!product) {
            throw new ApiError(404, "Product not found");
        }

        if (product.quantity < quantity) {
            throw new ApiError(400, "Not enough stock available");
        }

        // Initialize cart if it does not exist
        let updatedCart = cart || new Cart({ user: userId, items: [] });

        // Find if item exists in the cart
        const existingItem = updatedCart.items.find(item => item.product.toString() === productId);

        if (existingItem) {
            return res.status(400).json({
                success: false,
                error: "Item already in cart"
            });
        }

        // Add item to cart and update product quantity
        updatedCart.items.push({
            product: productId,
            quantity: quantity,
            price: product.sellingPrice
        });

        // Save both cart and product in parallel
        await Promise.all([
            updatedCart.save(),
            Product.findByIdAndUpdate(productId, { $inc: { quantity: -quantity } }).exec()
        ]);

        res.status(200).json({
            success: true,
            message: "Product added to cart successfully",
            data: updatedCart
        });

    } catch (error) {
        console.error("Error adding product to cart:", error);
        res.status(error.statusCode || 500).json({
            success: false,
            error: error.message || "Internal Server Error"
        });
    }
});
