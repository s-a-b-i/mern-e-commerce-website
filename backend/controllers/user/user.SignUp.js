import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asynchandler } from "../../utils/asynchandler.js";
import { User } from "../../models/user.model.js";

const SignUp = asynchandler(async (req, res, next) => {
  const { username, email, password } = req.body;

  if ([username, email, password].some((field) => field.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  const existUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (existUser) {
    throw new ApiError(409, "User already exists");
  }

  const newUser = await User.create({
    username,
    email,
    password, // Mongoose will automatically hash the password using pre('save') hook
    role: "General",
    profileImage : req.body.profileImage || null ,
  });

  const createdUser = await User.findById(newUser._id).select(
    "-password -refreshToken"
  ).lean();
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering user");
  }

  // Assuming ApiResponse class exists and is used for response formatting
  return res
    .status(200)
    .json(new ApiResponse(200, createdUser, "User registered Successfully"));
});

export { SignUp };
