// controllers/cart/cart.view.js

import { Cart } from "../../models/cart.model.js";
import { asynchandler } from "../../utils/asynchandler.js";
import { ApiError } from "../../utils/ApiError.js";

export const viewCart = asynchandler(async (req, res) => {
    const userId = req.user._id;

    try {
        const cart = await Cart.findOne({ user: userId })
                               .populate('items.product', 'name images sellingPrice')
                               .exec();

        if (!cart) {
            return res.status(200).json({
                success: true,
                message: "Cart is empty",
                data: { items: [] }
            });
        }

        res.status(200).json({
            success: true,
            message: "Cart retrieved successfully",
            data: cart
        });

    } catch (error) {
        console.error("Error viewing cart:", error);
        throw new ApiError(500, "Error retrieving cart");
    }
});