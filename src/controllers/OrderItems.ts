import models from "../models/index";
import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";

export const createOrderItem = catchAsync(
  async (req: Request, res: Response) => {
    const { orderId, groceryItemId, quantity, itemPrice } = req.body;

    const orderItem = await models.orderItems.createOrderItem(
      orderId,
      groceryItemId,
      quantity,
      itemPrice
    );

    return res
      .status(201)
      .json({ message: "Order item added successfully", orderItem });
  }
);

export const getOrderItemsByOrder = catchAsync(
  async (req: Request, res: Response) => {
    const orderId = parseInt(req.params.orderId);
    const orderItems = await models.orderItems.getOrderItemsByOrder(orderId);
    return res.json(orderItems);
  }
);

export const deleteOrderItem = catchAsync(
  async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    await models.orderItems.deleteOrderItem(id);
    return res.json({ message: "Order item deleted successfully" });
  }
);
