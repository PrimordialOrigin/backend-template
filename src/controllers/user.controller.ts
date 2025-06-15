import { Request, Response } from "express";
import { UserRepository } from "@/repo/interfaces";
import { ErrorHandler } from "../middleware/error.middleware";
import userBusiness from "../user.business";
import bcrypt from 'bcrypt'


export const createUser = (_userRepository: UserRepository) => {
  return async (req: Request, res: Response) => {
    const { fullname, password, email } = req.body;

    if (!fullname || fullname === "") throw new ErrorHandler(400, "Name is required!");

    if (!email || email === "") throw new ErrorHandler(400, "Please provide email!");

    if (!password || password === "") throw new ErrorHandler(400, "Password is required!")
    
    try {
      const user = {
        fullname,
        email,
        password
      };

       // @ts-ignore - id will auto generate on creation
      const response = await userBusiness.createUser(_userRepository, user);

      return res.json({
        success: true,
        payload: response,
      });
    } catch (error: any) {
      return res.status(error.status || 500).json({
        success: false,
        message: error.message || 'An unexpected error occurred',
      }); 
    }
  };
};

export const loginUser = (_userRepository: UserRepository) => {
  return async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || email.trim() === "") throw new ErrorHandler(400, 'Email is required!');

    if (!password || password.trim() === "") throw new ErrorHandler(400, 'Password is required!');

    try {
      const user = await userBusiness.findUserByEmail(_userRepository, email);

      if (!user) {
        throw new ErrorHandler(404, "user not found!");
      }
      
      const isPasswordValid = await bcrypt.compare(password, user.password)

      if (!isPasswordValid) {
        throw new ErrorHandler(401, "Invalid password");
      }

      const { password: _, ...userDetails } = user;

      return res.json({
        success: true,
        payload: userDetails,
      });
    } catch (error: any) {
      return res.status(error.status || 500).json({
        success: false,
        message: error.message || "An unexpected error occurred"
      })
    }
  }
}

export const findUserByEmail = (_userRepository: UserRepository) => {
  return async (req: Request, res: Response) => {
    const { email } = req.params;

    if (!email || email === "")
      throw new ErrorHandler(400, "Please provide email!");

    const response = await userBusiness.findUserByEmail(_userRepository, email);

    return res.json({
      success: true,
      payload: response,
    });
  };
};
