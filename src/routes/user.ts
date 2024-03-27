import { Router } from "express";

const router: Router = Router();
import {
  loginUser,
  signUp,
  userVerification,
  logOut,
} from "../controller/userController";

router.post("/login", loginUser);
router.post("/signup", signUp);
router.post("/", userVerification);
router.post("/logout", logOut);
export default router;
