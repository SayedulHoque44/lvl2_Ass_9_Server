import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { lostItemValidation } from "./lostItem.validation";
import { lostItemReportControllers } from "./lostItem.controllers";
import auth from "../../middleware/auth";

const router = express.Router();

router.post(
  "/",
  auth(),
  validateRequest(lostItemValidation.createLostItem),
  lostItemReportControllers.createLostItemReport
);
router.put("/:id", auth(), lostItemReportControllers.updateLostItemReport);
//
router.get("/:id", lostItemReportControllers.getSingleById);
//
router.delete("/:id", lostItemReportControllers.deleteSingleById);
//
router.get("/", lostItemReportControllers.getAll);
//

//
export const lostItemRoutes = router;
