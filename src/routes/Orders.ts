import { Router } from "express";
import validate from "../middleware/validation";
import validations from "../validation";
import controllers from "../controllers";
import auth from "../middleware/auth";

const router = Router();

router.post(
  "/createOrder",
  validate(validations.orders.createOrder),
  controllers.orders.createOrder
);

router.get("/all", auth("get"), controllers.orders.getAllOrders);
router.get("/:userId", auth("get"), controllers.orders.getOrdersByUser);
router.delete("/:id", auth("delete"), controllers.orders.deleteOrder);

export default router;
