import models from "../models/index";
import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import ApiError from "../utils/ApiError";
import { StatusCodes } from "http-status-codes";
import { AuthenticatedRequest } from "../middleware/auth";

export const createOrder = catchAsync(
  async (req: AuthenticatedRequest, res: Response) => {
    const { userId, items } = req.body;
    const { loginId, userRole } = req;
    if (userId != loginId && userRole != "admin") {
      return res.status(403).json({ message: "Forbidden" });
    }
    let totalAmount = 0;
    for (const item of items) {
      const groceryItem = await models.grocery.getGroceriesById(
        item.groceryItemId
      );
      if (item.quantity > groceryItem[0].inventory) {
        throw new ApiError(
          StatusCodes.BAD_REQUEST,
          `Insufficient Inventory for ${groceryItem[0].name} (Inventory: ${groceryItem[0].inventory} , ordered:${item.quantity})`
        );
      }
      totalAmount += item.quantity * groceryItem[0].price;
    }
    const order = await models.orders.createOrder(userId, totalAmount);

    for (const item of items) {
      const groceryItem = await models.grocery.getGroceriesById(
        item.groceryItemId
      );
      const itemsAvailability = await models.grocery.adjustGrocery(
        item.groceryItemId,
        item.quantity
      );
      if (!itemsAvailability) {
        return res
          .status(403)
          .json({ message: "Inventory low or Item not available" });
      }
      await models.orderItems.createOrderItem(
        order[0].insertId,
        item.groceryItemId,
        item.quantity,
        groceryItem[0].price
      );
    }

    return res.status(201).json({ message: "Order placed successfully" });
  }
);

export const getAllOrders = catchAsync(async (_req: Request, res: Response) => {
  const orders = await models.orders.getAllOrders();
  return res.json(orders);
});

export const getOrdersByUser = catchAsync(
  async (req: AuthenticatedRequest, res: Response) => {
    const userId = parseInt(req.params.userId);
    const { loginId, userRole } = req;
    if (userId != loginId && userRole != "admin") {
      return res.status(403).json({ message: "Forbidden" });
    }
    const orders = await models.orders.getOrdersByUser(userId);
    return res.json(orders);
  }
);

export const deleteOrder = catchAsync(
  async (req: AuthenticatedRequest, res: Response) => {
    const orderId = parseInt(req.params.id);
    const [result]: any = await models.orders.getOrdersById(orderId);
    const { loginId, userRole } = req;
    if (result.user_id != loginId && userRole != "admin") {
      return res.status(403).json({ message: "Forbidden" });
    }
    await models.orders.deleteOrder(orderId);
    return res.json({ message: "Order deleted successfully" });
  }
);
