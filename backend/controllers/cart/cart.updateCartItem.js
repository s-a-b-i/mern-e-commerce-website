import { Cart } from "../../models/cart.model.js";
import { asynchandler } from "../../utils/asynchandler.js";
import { ApiError } from "../../utils/ApiError.js";


export const updateCartItem = asynchandler(async (req, res) => {
    const { productId, action } = req.body;
    const userId = req.user._id;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
        throw new ApiError(404, "Cart not found");
    }

    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
    if (itemIndex === -1) {
        throw new ApiError(404, "Product not found in cart");
    }

    if (action === 'increment') {
        cart.items[itemIndex].quantity += 1;
    } else if (action === 'decrement') {
        if (cart.items[itemIndex].quantity > 1) {
            cart.items[itemIndex].quantity -= 1;
        } else {
            cart.items.splice(itemIndex, 1);
        }
    }

    await cart.save();

    res.status(200).json({
        success: true,
        message: "Cart updated successfully",
        data: cart
    });
})