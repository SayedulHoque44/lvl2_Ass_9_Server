import { Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { userServices } from "./user.service";
import pick from "../../../utils/pick";

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
const userMeta = catchAsync(
  async (
    req: Request & { user?: { id: string; email: string } },
    res: Response
  ) => {
    const result = await userServices.userMeta(req.user!.id);

    sendResponse(res, {
      success: true,
      statusCode: 201,
      message: "User meta retrive successfully",
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
const changePassword = catchAsync(
  async (
    req: Request & { user?: { id: string; email: string } },
    res: Response
  ) => {
    const result = await userServices.changePassword(req.user!.id, req.body);

    sendResponse(res, {
      success: true,
      statusCode: 201,
      message: "Password Changed successfully",
      data: result,
    });
  }
);

const getAll = catchAsync(async (req, res) => {
  const filters = pick(req.query, ["searchTerm", "name", "email"]);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

  const result = await userServices.getAll(filters, options);
  const { meta, data } = result;

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Users retrive successfully",
    meta,
    data,
  });
});
//
const updateStatus = catchAsync(async (req: Request, res: Response) => {
  const result = await userServices.updateStatus(req.params.id, req.body);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "User status update successfully",
    data: result,
  });
});
//
export const userControllers = {
  createUser,
  loginUser,
  getMe,
  updateProfile,
  changePassword,
  getAll,
  updateStatus,
  userMeta,
};
