import { Router } from "express";
import validate from "../middleware/validation";
import validations from "../validation";
import controllers from "../controllers";

const router = Router();

router.post(
  "/createOrder",
  validate(validations.orders.createOrder),
  controllers.orders.createOrder
);

router.get("/all", controllers.orders.getAllOrders);
router.get("/:userId", controllers.orders.getOrdersByUser);
router.delete("/:id", controllers.orders.deleteOrder);

export default router;
