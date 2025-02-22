import { Router } from "express";
import validate from "../middleware/validation";
import validations from "../validation";
import controllers from "../controllers";
const router = Router();
router.post(
  "/createUser",
  validate(validations.users.createUser),
  controllers.users.createUser
);
export default router;
