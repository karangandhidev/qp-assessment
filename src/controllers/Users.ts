import models from "../models/index";
import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
export const createUser = catchAsync(async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const result = await models.users.createUser(username, password);

  return res.json(result);
});
