import { Router } from "express";
import validate from "../middleware/validation";
import validations from "../validation";
import controllers from "../controllers";
import auth from "../middleware/auth";

const router = Router();

router.post(
  "/createOrderItem",
  auth("delete"),
  validate(validations.orderItems.createOrderItem),
  controllers.orderItems.createOrderItem
);

router.get(
  "/:orderId",
  auth("get"),
  controllers.orderItems.getOrderItemsByOrder
);
router.delete("/:id", auth("delete"), controllers.orderItems.deleteOrderItem);

export default router;
