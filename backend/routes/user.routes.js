import { Router } from "express";
import { SignUp } from "../controllers/user/user.SignUp.js";
import { Login } from "../controllers/user/user.LogIn.js";
import { userdetails } from "../controllers/user/user.Details.js";
import { verifyJWT } from "../middleware/auth.middleware.js";   
import { logoutUser } from "../controllers/user/user.Logout.js";
import { getAllUsers } from "../controllers/user/user.fetchUser.js";
import { updateUserDetails } from "../controllers/user/user.Update.js";
import { isAdmin } from "../middleware/adminAuth.middleware.js";


const userRouter = Router();


// User routes
userRouter.route('/signup').post(SignUp);
userRouter.route('/login').post(Login);
userRouter.route('/userdetails').get(verifyJWT, userdetails);
userRouter.route('/logout').get(verifyJWT, logoutUser);

// Admin routes
userRouter.route('/allusers').get(verifyJWT, isAdmin, getAllUsers);
userRouter.route('/updateuser').put(verifyJWT, isAdmin, updateUserDetails);



export { userRouter };
