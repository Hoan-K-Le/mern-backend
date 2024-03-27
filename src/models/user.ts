import { model, Schema, Types } from "mongoose";
import { IUser } from "../interfaces/user.interface";

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  workouts: [{ type: Types.ObjectId, ref: "Workout" }],
});

const UserModel = model<IUser>("User", userSchema);

export default UserModel;
