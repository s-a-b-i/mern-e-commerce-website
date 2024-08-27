import { asynchandler } from "../../utils/asynchandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { User } from "../../models/user.model.js";

const logoutUser = asynchandler(async (req, res) => {
    const userId = req.user?._id;

    if (!userId) {
        return res.status(401).json(
            new ApiResponse(401, null, "Unauthorized: User not found")
        );
    }

    // Remove refresh token from the user document
    await User.findByIdAndUpdate(userId, {
        $unset: { refreshToken: 1 }
    }, { new: true });

    // Options for clearing cookies
    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: 'strict',
        path: '/',
        expires: new Date(0) // Set expiration to the past
    };

    // Clear cookies and send response
    res
        .status(200)
        .clearCookie("accessToken", cookieOptions)
        .clearCookie("refreshToken", cookieOptions)
        .json(new ApiResponse(200, {}, "Logged out successfully"));

    // Optionally, you could implement token blacklisting here
    // await blacklistToken(req.cookies?.accessToken);
});

export { logoutUser }