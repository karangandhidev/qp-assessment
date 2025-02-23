import { Router } from "express";
import validate from "../middleware/validation";
import validations from "../validation";
import controllers from "../controllers";
import auth from "../middleware/auth";

const router = Router();

router.post(
  "/createGrocery",
  auth("admincreate"),
  validate(validations.grocery.createGrocery),
  controllers.grocery.createGrocery
);

router.get("/list", auth("userget"), controllers.grocery.getGroceries);

router.put(
  "/update/:id",
  auth("adminupdate"),
  validate(validations.grocery.updateGrocery),
  controllers.grocery.updateGrocery
);

router.delete(
  "/:id",
  auth("admindelete"),
  validate(validations.grocery.deleteGrocery),
  controllers.grocery.deleteGrocery
);

export default router;
