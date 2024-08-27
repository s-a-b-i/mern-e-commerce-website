

import { Cart } from "../../models/cart.model.js";
import { asynchandler } from "../../utils/asynchandler.js";
import { ApiError } from "../../utils/ApiError.js";

export const removeCartItem = asynchandler(async (req, res) => {
    const { productId } = req.params;
    const userId = req.user._id;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
        throw new ApiError(404, "Cart not found");
    }

    cart.items = cart.items.filter(item => item.product.toString() !== productId);

    await cart.save();

    res.status(200).json({
        success: true,
        message: "Item removed from cart successfully",
        data: cart
    });
});