// routes/product.routes.js
import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { addToSearchHistory } from "../controllers/search/search.addToSearchHistory.js";
import { deleteSearchHistoryItem } from "../controllers/search/search.deleteSearchHistoryItem .js";
import { getSearchSuggestions } from "../controllers/search/search.getSearchSuggestions.js.js";
import { getPreviousSearches } from "../controllers/search/search.getPreviousSearches.js";
import { searchProducts } from "../controllers/search/search.searchProducts.js";


const searchRouter = Router();

searchRouter.route('/products').get(searchProducts);
searchRouter.route('/suggestions').get(getSearchSuggestions);
searchRouter.route('/history')
  .get(verifyJWT, getPreviousSearches)
  .post(verifyJWT, addToSearchHistory);
searchRouter.route('/history/:id').delete(verifyJWT, deleteSearchHistoryItem);

export { searchRouter };