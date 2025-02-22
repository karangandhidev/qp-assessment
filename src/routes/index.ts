import { Router } from "express";
import userRouter from "./Users";
const router = Router();

router.use("/users", userRouter);
export default router;
