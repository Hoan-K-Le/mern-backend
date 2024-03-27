import Workout from "../models/workout";
import User from "../models/user";
import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
// create workout
const newWorkout = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const { name, weight, reps, userId } = req.body;
    const workout = await Workout.create({
      name: name,
      weight: weight,
      reps: reps,
    });
    await User.findByIdAndUpdate(userId, { $push: { workouts: workout._id } });
    return res
      .status(200)
      .json({ msg: "Successfully created workout", workout });
  } catch (error) {
    console.log(error);
  }
};

const getWorkouts = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ msg: "Authentication token is required" });
    }
    const decoded = jwt.verify(
      token,
      process.env.SECRET as string
    ) as JwtPayload;
    const user = await User.findById(decoded.user).populate("workouts");
    if (!user) {
      return res.status(403).json({ msg: "No user" });
    }
    console.log(user, "user");
    return res.status(200).json({ user });
  } catch (error) {
    console.log(error);
  }
};

export { newWorkout, getWorkouts };
