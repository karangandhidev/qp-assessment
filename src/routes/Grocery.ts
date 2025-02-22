import { Router } from "express";
import validate from "../middleware/validation";
import validations from "../validation";
import controllers from "../controllers";
import auth from "../middleware/auth";

const router = Router();

router.post(
  "/createGrocery",
  auth("create"),
  validate(validations.grocery.createGrocery),
  controllers.grocery.createGrocery
);

router.get("/list", auth("get"), controllers.grocery.getGroceries);

router.put(
  "/update/:id",
  auth("update"),
  validate(validations.grocery.updateGrocery),
  controllers.grocery.updateGrocery
);

router.delete(
  "/delete/:id",
  auth("delete"),
  validate(validations.grocery.deleteGrocery),
  controllers.grocery.deleteGrocery
);

export default router;
