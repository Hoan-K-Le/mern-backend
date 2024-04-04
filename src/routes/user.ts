import { Router } from "express";

const router: Router = Router();
import {
  loginUser,
  signUp,
  userVerification,
  logOut,
  createProfile,
} from "../controller/userController";

router.post("/login", loginUser);
router.post("/signup", signUp);
router.get("/verifyUser", userVerification);
router.get("/logout", logOut);
router.post("/createProfile", createProfile);

export default router;
