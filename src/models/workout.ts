import { model, Schema } from "mongoose";
import { IWorkout } from "../interfaces/workout.interface";

const workoutSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    reps: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const workoutModel = model<IWorkout>("Workout", workoutSchema);
export default workoutModel;
