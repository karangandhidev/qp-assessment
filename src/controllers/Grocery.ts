import models from "../models/index";
import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";

export const createGrocery = catchAsync(async (req: Request, res: Response) => {
  const { name, description, price, inventory } = req.body;
  const result = await models.grocery.createGrocery(
    name,
    description,
    price,
    inventory
  );

  return res.status(201).json(result);
});

export const getGroceries = catchAsync(async (req: Request, res: Response) => {
  const groceries = await models.grocery.getAllGroceries();
  return res.json(groceries);
});

export const updateGrocery = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, price, inventory } = req.body;
  const updatedGrocery = await models.grocery.updateGrocery(Number(id), {
    name,
    description,
    price,
    inventory,
  });

  return res.json(updatedGrocery);
});

export const deleteGrocery = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  await models.grocery.deleteGrocery(Number(id));

  return res.status(204).send();
});
