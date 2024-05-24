import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { foundItemValidation } from "./foundItem.validation";
import { foundItemReportControllers } from "./foundItem.controllers";
import auth from "../../middleware/auth";

const router = express.Router();

router.post(
  "/",
  auth(),
  validateRequest(foundItemValidation.createFoundItem),
  foundItemReportControllers.createFoundItemReport
);
router.get("/", foundItemReportControllers.getAll);
//
router.put("/:id", auth(), foundItemReportControllers.updatefoundItemReport);
//
router.get("/:id", foundItemReportControllers.getSingleById);
//
router.delete("/:id", foundItemReportControllers.deleteSingleById);
//
export const foundItemRoutes = router;
