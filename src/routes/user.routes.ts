import { Router } from "express";
import asyncHandler from "express-async-handler";
import { createUser, loginUser, findUserByEmail } from "../controllers/user.controller";
import _userRepository from "../repository/user.repository";

const UserRouter = Router();

// @ts-ignore
UserRouter.post("/create-user", asyncHandler(createUser(_userRepository)));
// @ts-ignore
UserRouter.post("/login", asyncHandler(loginUser(_userRepository)));
// @ts-ignore
UserRouter.get("/:email", asyncHandler(findUserByEmail(_userRepository)));

export default UserRouter;
