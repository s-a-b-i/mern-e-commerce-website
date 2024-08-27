// controllers/user.AllUsers.js

import { ApiError } from "../../utils/ApiError.js";
import { User } from "../../models/user.model.js";
import { asynchandler } from "../../utils/asynchandler.js";

const getAllUsers = asynchandler(async (req, res) => {
  try {
    const users = await User.find()
      .select("-password -__v")
      .lean()
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: users,
      message: "All users fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching all users:", error.message);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
});

export { getAllUsers };
