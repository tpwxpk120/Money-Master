import express from "express";
import {
  registerController,
  loginController,
} from "../controllers/userController.js";

//router object
const userRouter = express.Router();

userRouter.post("/login", loginController);

//POST || REGISTER USER
userRouter.post("/register", registerController);

export { userRouter };
