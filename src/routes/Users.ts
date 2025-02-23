import { Router } from "express";
import validate from "../middleware/validation";
import validations from "../validation";
import controllers from "../controllers";
import auth from "../middleware/auth";
const router = Router();
router.post(
  "/createUser",
  validate(validations.users.createUser),
  controllers.users.createUser
);
router.delete("/:id", auth("admindelete"), controllers.users.deleteUserById);
export default router;
router.post(
  "/login",
  validate(validations.users.createUser),
  controllers.users.login
);
