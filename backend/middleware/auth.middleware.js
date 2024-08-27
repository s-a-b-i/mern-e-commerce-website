import { asynchandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { generateAccessTokenandRefreshToken } from "../utils/generateTokens.js";

export const verifyJWT = asynchandler(async (req, res, next) => {
    try {
        // Extract tokens from cookies or Authorization header
        const accessToken = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        const refreshToken = req.cookies?.refreshToken;

        // Check if both tokens are missing
        if (!accessToken && !refreshToken) {
            throw new ApiError(401, "Unauthorized: No tokens provided");
        }

        // Function to set new cookies
        const setCookies = (tokens) => {
            res.cookie("accessToken", tokens.accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'Strict',
                maxAge: 1 * 60 * 1000, // 1 minute
            });

            res.cookie("refreshToken", tokens.refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'Strict',
                maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            });
        };

        // Function to set user and continue
        const setUserAndContinue = async (userId) => {
            req.user = await User.findById(userId).select("-password -refreshToken");
            if (!req.user) {
                throw new ApiError(401, "Unauthorized: Invalid user");
            }
            next();
        };

        // Function to refresh tokens
        const refreshTokens = async (refreshToken) => {
            const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
            const newTokens = await generateAccessTokenandRefreshToken(decoded._id);
            setCookies(newTokens);
            await setUserAndContinue(decoded._id);
        };

        // Verify access token if present
        if (accessToken) {
            jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
                if (err) {
                    // If access token is expired and refresh token is available, refresh tokens
                    if (err.name === "TokenExpiredError" && refreshToken) {
                        await refreshTokens(refreshToken);
                    } else {
                        throw new ApiError(401, "Unauthorized: Invalid access token");
                    }
                } else {
                    // If access token is valid, set user and continue
                    await setUserAndContinue(decoded._id);
                }
            });
        } else if (refreshToken) {
            // If only refresh token is available, attempt to refresh tokens
            await refreshTokens(refreshToken);
        }
    } catch (error) {
        next(new ApiError(401, error?.message || "Unauthorized: Token verification failed"));
    }
});



// import { asynchandler } from "../utils/asynchandler.js";
// import { ApiError } from "../utils/ApiError.js";
// import jwt from "jsonwebtoken";
// import { User } from "../models/user.model.js";
// import { generateAccessTokenandRefreshToken } from "../utils/generateTokens.js";

// export const verifyJWT = asynchandler(async (req, res, next) => {
//     try {
//         // Extract tokens from cookies or Authorization header
//         const accessToken = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
//         const refreshToken = req.cookies?.refreshToken;

//         // Check if both tokens are missing
//         if (!accessToken && !refreshToken) {
//             throw new ApiError(401, "Unauthorized: No tokens provided");
//         }

//         // Function to set new cookies
//         const setCookies = (tokens) => {
//             res.cookie("accessToken", tokens.accessToken, {
//                 httpOnly: true,
//                 secure: process.env.NODE_ENV === 'production',
//                 sameSite: 'Strict',
//                 maxAge: 1 * 60 * 1000, // 1 minute
//             });

//             res.cookie("refreshToken", tokens.refreshToken, {
//                 httpOnly: true,
//                 secure: process.env.NODE_ENV === 'production',
//                 sameSite: 'Strict',
//                 maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
//             });
//         };

//         // Function to set user and continue
//         const setUserAndContinue = async (userId) => {
//             const user = await User.findById(userId).select("-password -refreshToken");
//             if (!user) {
//                 // Clear cookies and respond with an error
//                 res.clearCookie('accessToken');
//                 res.clearCookie('refreshToken');
//                 return res.status(401).json({ message: "User not found. Please login again." });
//             }
//             req.user = user;
//             next();
//         };

//         // Function to refresh tokens
//         const refreshTokens = async (refreshToken) => {
//             const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
//             const user = await User.findById(decoded._id);
//             if (!user) {
//                 // Clear cookies and respond with an error
//                 res.clearCookie('accessToken');
//                 res.clearCookie('refreshToken');
//                 return res.status(401).json({ message: "User not found. Please login again." });
//             }
//             const newTokens = await generateAccessTokenandRefreshToken(user._id);
//             setCookies(newTokens);
//             await setUserAndContinue(user._id);
//         };

//         // Verify access token if present
//         if (accessToken) {
//             jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
//                 if (err) {
//                     // If access token is expired and refresh token is available, refresh tokens
//                     if (err.name === "TokenExpiredError" && refreshToken) {
//                         await refreshTokens(refreshToken);
//                     } else {
//                         throw new ApiError(401, "Unauthorized: Invalid access token");
//                     }
//                 } else {
//                     // If access token is valid, set user and continue
//                     await setUserAndContinue(decoded._id);
//                 }
//             });
//         } else if (refreshToken) {
//             // If only refresh token is available, attempt to refresh tokens
//             await refreshTokens(refreshToken);
//         }
//     } catch (error) {
//         next(new ApiError(401, error?.message || "Unauthorized: Token verification failed"));
//     }
// });














// import { asynchandler } from "../utils/asynchandler.js";
// import { ApiError } from "../utils/ApiError.js";
// import jwt from "jsonwebtoken";
// import { User } from "../models/user.model.js";

// export const verifyJWT = asynchandler(async (req, _, next) => {
//    try {
//     const token = req.cookies.accessToken || 
//     req.header("Authorization")?.replace("Bearer ", "");
 
//     if (!token) {
//      throw new ApiError(401, "Unauthorized");
//     }
 
//     const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
 
//     const user = await User.findById(decodedToken._id).select("-password -refreshToken")
 
//     if (!user) {
//      throw new ApiError(401, "Invalid token");
//     }
 
//     req.user = user;
 
//     next();
//    } catch (error) {
//     next(new ApiError(401, error?.message || "Invalid token"));
//    }
// })



