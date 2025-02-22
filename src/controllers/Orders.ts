import models from "../models/index";
import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";

export const createOrder = catchAsync(async (req: Request, res: Response) => {
  const { userId, totalAmount, items } = req.body;

  const order = await models.orders.createOrder(userId, totalAmount);

  for (const item of items) {
    await models.orderItems.createOrderItem(
      order.id,
      item.groceryItemId,
      item.quantity,
      item.itemPrice
    );
  }

  return res.status(201).json({ message: "Order placed successfully", order });
});

export const getAllOrders = catchAsync(async (_req: Request, res: Response) => {
  const orders = await models.orders.getAllOrders();
  return res.json(orders);
});

export const getOrdersByUser = catchAsync(
  async (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId);
    const orders = await models.orders.getOrdersByUser(userId);
    return res.json(orders);
  }
);

export const deleteOrder = catchAsync(async (req: Request, res: Response) => {
  const orderId = parseInt(req.params.id);
  await models.orders.deleteOrder(orderId);
  return res.json({ message: "Order deleted successfully" });
});
