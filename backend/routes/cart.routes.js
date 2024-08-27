// routes/cart.routes.js

import { Router } from "express";
import { addToCart } from "../controllers/cart/cart.add.js";
import { getCartItemCount } from "../controllers/cart/cart.count.js";
import { viewCart } from "../controllers/cart/cart.view.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { updateCartItem } from "../controllers/cart/cart.updateCartItem.js";
import { removeCartItem } from "../controllers/cart/cart.removeCartItem.js";

const cartRouter = Router();

// Apply verifyJWT middleware to all cart routes
cartRouter.use(verifyJWT);

// Cart routes
cartRouter.route('/add').post(addToCart);
cartRouter.get("/count", getCartItemCount);
cartRouter.get("/view", viewCart);
cartRouter.patch("/update", updateCartItem);
cartRouter.delete("/remove/:productId", removeCartItem);

export { cartRouter };