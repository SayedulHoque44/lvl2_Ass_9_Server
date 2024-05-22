import { Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { foundItemReportServices } from "./lostItem.service";
import pick from "../../../utils/pick";
import {
  lostItemFilterableFields,
  lostItemSearchAbleFields,
} from "./lostItem.constant";

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
      message: "Lost item reported successfully",
      data: result,
    });
  }
);

const getAll = catchAsync(async (req, res) => {
  const filters = pick(req.query, lostItemFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

  const result = await foundItemReportServices.getAll(filters, options);
  const { meta, data } = result;

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Lost item retrive successfully",
    meta,
    data,
  });
});

//
export const foundItemReportControllers = {
  createFoundItemReport,
  getAll,
};
