import { Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { lostItemReportServices } from "./lostItem.service";
import pick from "../../../utils/pick";
import {
  lostItemFilterableFields,
  lostItemSearchAbleFields,
} from "./lostItem.constant";

const createLostItemReport = catchAsync(
  async (
    req: Request & { user?: { id: string; email: string } },
    res: Response
  ) => {
    const { user, body } = req;

    const result = await lostItemReportServices.createLostItemReport(
      user!.id,
      body
    );

    sendResponse(res, {
      success: true,
      statusCode: 201,
      message: "Lost item reported successfully",
      data: result,
    });
  }
);
const updateLostItemReport = catchAsync(
  async (
    req: Request & { user?: { id: string; email: string } },
    res: Response
  ) => {
    const { user, body, params } = req;

    const result = await lostItemReportServices.updateLostItemReport(
      params.id,
      body
    );

    sendResponse(res, {
      success: true,
      statusCode: 201,
      message: "Lost item updated successfully",
      data: result,
    });
  }
);

const getAll = catchAsync(async (req, res) => {
  const filters = pick(req.query, lostItemFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

  const result = await lostItemReportServices.getAll(filters, options);
  const { meta, data } = result;

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Lost items retrive successfully",
    meta,
    data,
  });
});
//
const getSingleById = catchAsync(async (req, res) => {
  const { params } = req;
  const result = await lostItemReportServices.getSingleById(params.id);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Lost item retrive successfully",
    data: result,
  });
});
//
const deleteSingleById = catchAsync(async (req, res) => {
  const { params } = req;
  const result = await lostItemReportServices.deleteSingleById(params.id);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Lost item deleted successfully",
    data: result,
  });
});

//
export const lostItemReportControllers = {
  createLostItemReport,
  getAll,
  updateLostItemReport,
  getSingleById,
  deleteSingleById,
};
