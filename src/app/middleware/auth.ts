import { NextFunction, Request, Response } from "express";
import { jwtHelpers } from "../../utils/jwtHelpers";
import config from "../../config";

const auth = () => {
  return async (
    req: Request & { user?: {} },
    res: Response,
    next: NextFunction
  ) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        throw new Error("Your are not Authorized!");
      }

      const decodedData = jwtHelpers.verifyToken(
        token,
        config.access_Secrect as string
      );

      req.user = decodedData;

      next();
    } catch (error) {
      next(error);
    }
  };
};

export default auth;
