import { StatusCodes } from "http-status-codes";
import ApiError from "../utils/ApiError";
import { rights } from "./roles";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export interface AuthenticatedRequest extends Request {
  loginId?: number;
  userRole?: string;
}
const auth =
  (access: any) =>
  (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = String(req.headers.authorization).split(" ")[1];
    if (!token) {
      throw new ApiError(StatusCodes.UNAUTHORIZED, "Invalid Authentication");
    }
    const verified: any = jwt.verify(token, String(process.env.jwt_secret));
    if (!verified) {
      throw new ApiError(StatusCodes.UNAUTHORIZED, "Invalid Authentication");
    }
    const user_rights = rights.get(verified.role);
    if (!user_rights.includes(access)) {
      throw new ApiError(StatusCodes.FORBIDDEN, "Invalid Authentication");
    }
    req.loginId = verified.id;
    req.userRole = verified.role;
    next();
  };

export default auth;
