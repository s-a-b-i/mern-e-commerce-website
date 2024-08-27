// controllers/cart/cart.count.js

import { Cart } from "../../models/cart.model.js";
import { asynchandler } from "../../utils/asynchandler.js";
import { ApiError } from "../../utils/ApiError.js";

const getCartItemCount = asynchandler(async (req, res) => {
    try {
        const userId = req.user._id;

        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(200).json({
                success: true,
                count: 0
            });
        }

        const itemCount = cart.items.reduce((total, item) => total + item.quantity, 0);

        res.status(200).json({
            success: true,
            count: itemCount
        });
    } catch (error) {
        console.error("Error getting cart item count:", error);
        throw new ApiError(500, "Error getting cart item count");
    }
});

export { getCartItemCount };