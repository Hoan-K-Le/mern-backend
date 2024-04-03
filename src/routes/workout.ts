import { Router } from "express";

const router: Router = Router();

import {
  newWorkout,
  getWorkouts,
  deleteWorkout,
} from "../controller/workoutController";

router.post("/addWorkout", newWorkout);
router.get("/getWorkouts", getWorkouts);
router.delete("/deleteWorkout", deleteWorkout);
export default router;
