import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { userValidations } from "./user.validation";
import { userControllers } from "./user.controller";
import auth from "../../middleware/auth";

const router = express.Router();

router.post(
  "/register",
  validateRequest(userValidations.createUser),
  userControllers.createUser
);
//
router.post(
  "/login",
  validateRequest(userValidations.loginUser),
  userControllers.loginUser
);
//
router.get("/my-profile", auth(), userControllers.getMe);
router.put("/my-profile", auth(), userControllers.updateProfile);
router.put("/change-password", auth(), userControllers.changePassword);

//
export const userRoutes = router;
