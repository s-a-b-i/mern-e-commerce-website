import { User } from "../../models/user.model.js";
import { asynchandler } from "../../utils/asynchandler.js";
import { ApiError } from "../../utils/ApiError.js";

const updateUserDetails = asynchandler(async (req, res) => {
    // Check if the current user is an admin
    if (req.user.role !== 'Admin') {
        throw new ApiError(403, "Only admins can update user details");
    }

    const { userId, email, role, username } = req.body;

    if (!userId) {
        throw new ApiError(400, "User ID is required");
    }

    try {
        const updateData = {};
        if (email) updateData.email = email;
        if (role) updateData.role = role;
        if (username) updateData.username = username;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            updateData,
            { new: true, runValidators: true }
        ).select("-password -__v");

        if (!updatedUser) {
            throw new ApiError(404, "User not found");
        }

        res.status(200).json({
            success: true,
            data: updatedUser,
            message: "User details updated successfully"
        });
    } catch (error) {
        console.error("Error updating user details:", error.message);
        throw new ApiError(error.statusCode || 500, error.message || "Internal Server Error");
    }
});

export { updateUserDetails };