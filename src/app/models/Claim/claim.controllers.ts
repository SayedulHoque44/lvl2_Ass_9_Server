import { Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { claimServices } from "./claim.service";

const createClaim = catchAsync(
  async (
    req: Request & { user?: { id: string; email: string } },
    res: Response
  ) => {
    const { user, body } = req;

    const result = await claimServices.createClaim(user!.id, body);

    sendResponse(res, {
      success: true,
      statusCode: 201,
      message: "Claim created successfully",
      data: result,
    });
  }
);
//
const getAll = catchAsync(async (req, res) => {
  const result = await claimServices.getAll();

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Claim retrive successfully",
    data: result,
  });
});
//
const updateStatus = catchAsync(async (req, res) => {
  const result = await claimServices.updateStatus(req.params.claimId, req.body);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Claim status updated successfully",
    data: result,
  });
});
//

//
const getSingleById = catchAsync(async (req, res) => {
  const { params } = req;
  const result = await claimServices.getSingleById(params.id);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Claim item retrive successfully",
    data: result,
  });
});
//
const deleteSingleById = catchAsync(async (req, res) => {
  const { params } = req;
  const result = await claimServices.deleteSingleById(params.id);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Claim item deleted successfully",
    data: result,
  });
});
//
const updateClaimItemReport = catchAsync(
  async (
    req: Request & { user?: { id: string; email: string } },
    res: Response
  ) => {
    const { user, body, params } = req;

    const result = await claimServices.updateClaimItemReport(params.id, body);

    sendResponse(res, {
      success: true,
      statusCode: 201,
      message: "Claim item updated successfully",
      data: result,
    });
  }
);
export const claimControllers = {
  createClaim,
  getAll,
  updateStatus,
  getSingleById,
  updateClaimItemReport,
  deleteSingleById,
};
