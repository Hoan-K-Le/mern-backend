import { Types } from "mongoose";
import { IWorkout } from "./workout.interface";
export interface IUser {
  email: string;
  password: string;
  workouts: Types.ObjectId;
}
