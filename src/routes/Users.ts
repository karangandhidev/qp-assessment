import { Router } from "express";
import validate from "../middleware/validation";
import validations from "../validation";
import controllers from "../controllers";
import auth from "../middleware/auth";

const router = Router();

router.post(
  "/create/user",
  validate(validations.users.createUser),
  controllers.users.createUser
);
router.post(
  "/create/admin",
  validate(validations.users.createUser),
  controllers.users.createAdmin
);
router.delete(
  "/delete/:id",
  auth("admindelete"),
  controllers.users.deleteUserById
);
router.post(
  "/login",
  validate(validations.users.createUser),
  controllers.users.login
);

export default router;
