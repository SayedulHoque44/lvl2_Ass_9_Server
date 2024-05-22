import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { lostItemValidation } from "./lostItem.validation";
import { foundItemReportControllers } from "./lostItem.controllers";
import auth from "../../middleware/auth";

const router = express.Router();

router.post(
  "/",
  auth(),
  validateRequest(lostItemValidation.createLostItem),
  foundItemReportControllers.createFoundItemReport
);
router.get("/", foundItemReportControllers.getAll);
//

//
export const lostItemRoutes = router;
