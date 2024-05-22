import { Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { userServices } from "./user.service";

const createUser = catchAsync(async (req, res) => {
  const result = await userServices.createUser(req.body);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "User registered successfully",
    data: result,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const result = await userServices.loginUser(req.body);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "User logged in successfully",
    data: result,
  });
});

//
const getMe = catchAsync(
  async (
    req: Request & { user?: { id: string; email: string } },
    res: Response
  ) => {
    const result = await userServices.getMe(req.user!.id);

    sendResponse(res, {
      success: true,
      statusCode: 201,
      message: "Profile retrive successfully",
      data: result,
    });
  }
);
//
const updateProfile = catchAsync(
  async (
    req: Request & { user?: { id: string; email: string } },
    res: Response
  ) => {
    const result = await userServices.updateProfile(req.user!.id, req.body);

    sendResponse(res, {
      success: true,
      statusCode: 201,
      message: "User Profile update successfully",
      data: result,
    });
  }
);

//
export const userControllers = {
  createUser,
  loginUser,
  getMe,
  updateProfile,
};
