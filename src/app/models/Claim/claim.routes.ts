import express from "express";
import validateRequest from "../../middleware/validateRequest";
import auth from "../../middleware/auth";
import { claimControllers } from "./claim.controllers";
import { claimValidaiton } from "./claim.validation";

const router = express.Router();

router.post(
  "/",
  auth(),
  validateRequest(claimValidaiton.createClaim),
  claimControllers.createClaim
);
router.get("/", auth(), claimControllers.getAll);

router.put(
  "/:claimId",
  auth(),
  validateRequest(claimValidaiton.updateStatus),
  claimControllers.updateStatus
);
//

//
export const claimRoutes = router;
