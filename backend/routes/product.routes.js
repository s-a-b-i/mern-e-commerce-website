import { Router } from "express";
import { uploadProduct } from "../controllers/product/product.Upload.js";
import { isAdmin } from "../middleware/adminAuth.middleware.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { getProducts } from "../controllers/product/product.fetch.js";
import { updateProduct } from "../controllers/product/product.Update.js";
import { getSingleProductByCtaegory } from "../controllers/product/product.getSingleProductByCtaegory.js.js";
import { getAllProductsByCategory } from "../controllers/product/product.getAllProductsByCategory.js";
import { getProductDetails } from "../controllers/product/product.getDetails.js";
import { getProductsByCategoryWithSort } from "../controllers/product/product.productsByCategoryWithSort.js";


const productRouter = Router();



// Product routes
productRouter.route('/upload').post(verifyJWT, isAdmin, uploadProduct);
productRouter.route('/').get(getProducts); // New route to get products
productRouter.route('/:id').put(verifyJWT, isAdmin, updateProduct);
productRouter.route('/category').get(getSingleProductByCtaegory);
productRouter.route('/category/:category').get(getAllProductsByCategory);
productRouter.route('/productdetails/:id').get(getProductDetails);
productRouter.route('/sort/category').get(getProductsByCategoryWithSort);




export { productRouter }