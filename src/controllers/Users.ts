import models from "../models/index";
import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import jwt from "jsonwebtoken";
export const createUser = catchAsync(async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const result = await models.users.createUser(username, password);
  return res.json({ success: true, user: result });
});

export const deleteUserById = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    console.log(id);
    const result = await models.users.deleteUserById(Number(id));
    return res.json({ success: true, user: result });
  }
);

export const login = catchAsync(async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await models.users.login(username, password);

  const token = jwt.sign(user, String(process.env.jwt_secret));
  return res.json({ user, token });
});
