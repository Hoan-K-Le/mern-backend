import { Router } from "express";

const router: Router = Router();

import { newWorkout, getWorkouts } from "../controller/workoutController";

router.post("/addWorkout", newWorkout);
router.get("/getWorkouts", getWorkouts);
export default router;
