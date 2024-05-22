import express from "express";
import { userRoutes } from "../app/models/User/user.routes";
import { foundItemRoutes } from "../app/models/FoundItem/foundItem.routes";
import { foundItemCategoryRoutes } from "../app/models/FoundItemCategory/foundItemCategory.controllers.routes";
import { claimRoutes } from "../app/models/Claim/claim.routes";
import { lostItemRoutes } from "../app/models/LostItem/lostItem.routes";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/",
    route: userRoutes,
  },
  {
    path: "/found-item-categories",
    route: foundItemCategoryRoutes,
  },
  {
    path: "/found-items",
    route: foundItemRoutes,
  },
  {
    path: "/lost-items",
    route: lostItemRoutes,
  },
  {
    path: "/claims",
    route: claimRoutes,
  },
];

moduleRoutes.forEach((routeItem) =>
  router.use(routeItem.path, routeItem.route)
);

export default router;
