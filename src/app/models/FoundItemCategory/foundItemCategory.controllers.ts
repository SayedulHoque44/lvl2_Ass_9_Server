import { Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { foundItemCategoryServices } from "./foundItemCategory.service";

const createFoundItemCategory = catchAsync(async (req, res) => {
  const result = await foundItemCategoryServices.createFoundItemCategory(
    req.body
  );

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Found item category created successfully",
    data: result,
  });
});

const getAll = catchAsync(async (req, res) => {
  const result = await foundItemCategoryServices.getAll();

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Found item category retrive successfully",
    data: result,
  });
});

//
export const foundItemCategoryControllers = {
  createFoundItemCategory,
  getAll,
};
