import { Router } from "express";
import validate from "../middleware/validation";
import validations from "../validation";
import controllers from "../controllers";
import auth from "../middleware/auth";

const router = Router();

router.post(
  "/create/order",
  auth("usercreate"),
  validate(validations.orders.createOrder),
  controllers.orders.createOrder
);

router.get("/list", auth("adminget"), controllers.orders.getAllOrders);
router.get("/get/:userId", auth("userget"), controllers.orders.getOrdersByUser);
router.delete(
  "/delete/:id",
  auth("userdelete"),
  controllers.orders.deleteOrder
);

export default router;
