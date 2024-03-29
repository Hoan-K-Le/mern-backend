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
  createdProfile: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    required: false,
    default: "",
  },
  contactNumber: {
    type: String,
    required: false,
    default: "",
  },
  age: {
    type: Number,
    required: false,
    default: null,
  },
  gender: {
    type: String,
    required: false,
    default: "",
  },
  workouts: [{ type: Types.ObjectId, ref: "Workout" }],
});

const UserModel = model<IUser>("User", userSchema);

export default UserModel;
