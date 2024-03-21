import { Router } from "express";

const router: Router = Router();
import {
  loginUser,
  signUp,
  userVerification,
} from "../controller/userController";

router.post("/login", loginUser);
router.post("/signup", signUp);
router.post("/", userVerification);
export default router;
