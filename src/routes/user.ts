import { Router } from "express";

const router: Router = Router();
import { loginUser, signUp } from "../controller/userController";

router.post("/login", loginUser);
router.post("/signup", signUp);

export default router;
