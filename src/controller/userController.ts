import { Response, Request } from "express";
import bcrypt from "bcrypt";
import User from "../models/user";
// login user
const loginUser = async (req: Request, res: Response) => {
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
    // user.save();
    res.status(200).json({ msg: "success", user });
  } catch (error) {
    res.status(500).json({ msg: "failed to sign up." });
    console.log(error);
  }
};

export { loginUser, signUp };
