import { Response, Request } from "express";
import bcrypt from "bcrypt";
import User from "../models/user";
import jwt from "jsonwebtoken";
import { IUser } from "../interfaces/user.interface";

// login user
const loginUser = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(404).json({ msg: "Email or password is incorrect" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }
    const token = jwt.sign(
      { user: user._id },
      process.env.SECRET || "defaultVal",
      {
        expiresIn: "1h",
      }
    );
    return res.status(200).json({ user, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Failed to log in" });
  }
  res.json({ msg: "testing" });
};

// signup user
const signUp = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.json({ msg: "Need email or password" });
    }
    const exist = await User.findOne({ email });
    if (exist) {
      res.json({ msg: "Email already in use" });
    }

    // salt are random string of characters before it is hashed
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = await User.create({ email, password: hash });
    res.status(200).json({ msg: "success", user });
  } catch (error) {
    res.status(500).json({ msg: "failed to sign up." });
    console.log(error);
  }
};

export { loginUser, signUp };
