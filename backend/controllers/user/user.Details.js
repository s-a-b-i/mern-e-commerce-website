import { ApiError } from "../../utils/ApiError.js";
import { User } from "../../models/user.model.js";
import { asynchandler } from "../../utils/asynchandler.js";

const userdetails = asynchandler(async (req, res) => {
    const id = req.user._id;

    try {
        const user = await User.findById(id).select("-password  -__v").lean();

        if (!user) {
            throw new ApiError(404, "User not found");
        }

        res.status(200).json({
            success: true,
            data: user,
            message: "User details fetched successfully"
        });
    } catch (error) {
        console.error("Error fetching user details:", error.message);
        res.status(error.statusCode || 500).json({
            success: false,
            error: error.message || "Internal Server Error"
        });
    }
});

export { userdetails };
