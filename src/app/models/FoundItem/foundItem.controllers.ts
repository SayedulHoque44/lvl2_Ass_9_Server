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
export const foundItemReportControllers = {
  createFoundItemReport,
  getAll,
};
