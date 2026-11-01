import { Request, Response } from "express";
import * as userService from "../service/user.service";

export const createUserController = async (
  req: Request,
  res: Response
) => {
  try {
    const user = await userService.createUser(req.body);

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

export const getUserController = async (
  req: Request,
  res: Response
) => {
  try {
    const user = await userService.getUserById(Number(req.params.id));

    return res.status(200).json({
      success: true,
      data: user
    });
  } catch (error: any) {
    const status = error.message === "User not found" ? 404 : 400;

    return res.status(status).json({
      success: false,
      message: error.message
    });
  }
};