import express from "express";
import auth from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";
import createFoundItemCategoryValidaion from "./foundItemCategory.validation";
import { foundItemCategoryControllers } from "./foundItemCategory.controllers";
const router = express.Router();

router.post(
  "/",
  auth(),
  validateRequest(createFoundItemCategoryValidaion),
  foundItemCategoryControllers.createFoundItemCategory
);
router.get("/", foundItemCategoryControllers.getAll);

export const foundItemCategoryRoutes = router;
