import { Router } from "express";
import validate from "../middleware/validation";
import validations from "../validation";
import controllers from "../controllers";

const router = Router();

router.post(
  "/createGrocery",
  validate(validations.grocery.createGrocery),
  controllers.grocery.createGrocery
);

router.get("/list", controllers.grocery.getGroceries);

router.put(
  "/update/:id",
  validate(validations.grocery.updateGrocery),
  controllers.grocery.updateGrocery
);

router.delete(
  "/delete/:id",
  validate(validations.grocery.deleteGrocery),
  controllers.grocery.deleteGrocery
);

export default router;
