import { ApiError } from "../utils/ApiError.js";

const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'Admin') {
        next();
    } else {
        throw new ApiError(403, "Admin access required");
    }
};

export { isAdmin };