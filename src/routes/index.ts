import { Router } from "express";
import userRouter from "./Users";
import groceryRouter from "./Grocery";
import ordersRouter from "./Orders";

const router = Router();

router.use("/users", userRouter);

router.use("/grocery", groceryRouter);

router.use("/orders", ordersRouter);

export default router;
