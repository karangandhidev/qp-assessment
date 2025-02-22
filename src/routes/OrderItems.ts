import { Router } from "express";
import validate from "../middleware/validation";
import validations from "../validation";
import controllers from "../controllers";

const router = Router();

router.post(
  "/createOrderItem",
  validate(validations.orderItems.createOrderItem),
  controllers.orderItems.createOrderItem
);

router.get("/:orderId", controllers.orderItems.getOrderItemsByOrder);
router.delete("/:id", controllers.orderItems.deleteOrderItem);

export default router;
