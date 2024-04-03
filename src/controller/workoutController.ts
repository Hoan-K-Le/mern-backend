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
    const updatedUserData = await User.findByIdAndUpdate(
      userId,
      {
        $push: { workouts: workout._id },
      },
      { new: true }
    );
    return res
      .status(200)
      .json({ msg: "Successfully created workout", updatedUserData });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error" });
  }
};

const getWorkouts = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const { userId } = req.query;

    const user = await User.findById(userId).populate("workouts");
    if (!user) {
      return res.status(403).json({ msg: "No user" });
    }
    return res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error" });
  }
};

const deleteWorkout = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const { workoutId, userId } = req.body;
    await Workout.deleteOne({ _id: workoutId });
    await User.updateMany({}, { $pull: { workouts: workoutId } });
    return res.status(200).json({ msg: "success" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error" });
  }
};

export { newWorkout, getWorkouts, deleteWorkout };
