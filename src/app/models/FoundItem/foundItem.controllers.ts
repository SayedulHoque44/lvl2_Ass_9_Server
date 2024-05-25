import { Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { foundItemReportServices } from "./foundItem.service";
import pick from "../../../utils/pick";
import {
  foundItemFilterableFields,
  foundItemSearchAbleFields,
} from "./foundItem.constant";

const createFoundItemReport = catchAsync(
  async (
    req: Request & { user?: { id: string; email: string } },
    res: Response
  ) => {
    const { user, body } = req;

    const result = await foundItemReportServices.createFoundItemReport(
      user!.id,
      body
    );

    sendResponse(res, {
      success: true,
      statusCode: 201,
      message: "Found item reported successfully",
      data: result,
    });
  }
);

const getAll = catchAsync(async (req, res) => {
  const filters = pick(req.query, foundItemFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

  const result = await foundItemReportServices.getAll(filters, options);
  const { meta, data } = result;

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Found item retrive successfully",
    meta,
    data,
  });
});

//

//
const getSingleById = catchAsync(async (req, res) => {
  const { params } = req;
  const result = await foundItemReportServices.getSingleById(params.id);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Found item retrive successfully",
    data: result,
  });
});
//
const deleteSingleById = catchAsync(
  async (
    req: Request & { user?: { id: string; email: string } },
    res: Response
  ) => {
    const { params, user } = req;
    const result = await foundItemReportServices.deleteSingleById(params.id);

    sendResponse(res, {
      success: true,
      statusCode: 201,
      message: "Found item deleted successfully",
      data: result,
    });
  }
);
const updatefoundItemReport = catchAsync(
  async (
    req: Request & { user?: { id: string; email: string } },
    res: Response
  ) => {
    const { user, body, params } = req;

    const result = await foundItemReportServices.updatefouondItemReport(
      params.id,
      body
    );

    sendResponse(res, {
      success: true,
      statusCode: 201,
      message: "Found item updated successfully",
      data: result,
    });
  }
);
export const foundItemReportControllers = {
  createFoundItemReport,
  getAll,
  updatefoundItemReport,
  getSingleById,
  deleteSingleById,
};
