import { Response, Request } from "express";
import cookie from "cookie";
import User from "../models/user";
import jwt from "jsonwebtoken";
import { comparePassword, hashPassword } from "../helper/auth";

// login user
const loginUser = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(404).json({ msg: "All fields must be filled." });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "Incorrect email." });
    }
    const match = comparePassword(password, user.password);
    if (!match) {
      return res.status(401).json({ msg: "Incorrect password." });
    }
    const token = jwt.sign(
      { user: user._id },
      process.env.SECRET || "defaultVal",
      {
        expiresIn: "1h",
      }
    );
    if (!token) {
      return res.status(401).json({ msg: "missing token." });
    }
    res.cookie("token", token);
    return res.status(200).json({ msg: "Successfully logged in." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Failed to log in" });
  }
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
    console.log(password, "backend");

    const hash = await hashPassword(password);
    const user = await User.create({ email, password: hash });
    res.status(200).json({ msg: "success", user });
  } catch (error) {
    return res.status(500).json({ msg: "failed to sign up." });
    console.log(error);
  }
};

// logout user
const logOut = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
  } catch (err) {
    console.log(err);
  }
};

// user verification
const userVerification = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    // if we did not install cookieparser then we have to parse it manually
    // const cookies = cookie.parse(req.headers.cookie || "");
    // If we do have cookie parser installed then we can just directly access the token
    const token = req.cookies.token;
    if (!token) {
      return res.status(403).json({ msg: "Access denied." });
    }
    if (!process.env.SECRET) {
      return res.status(500).json({ msg: "Denied for missing secret." });
    }
    jwt.verify(token, process.env.SECRET, async (err: any, data: any) => {
      if (err) {
        return res.json({ msg: "error verifying user" });
      } else {
        const user = await User.findOne({ _id: data.user });
        if (!user) {
          return res.json({ msg: "User not found" });
        } else {
          return res.json({ msg: "Verified", user });
        }
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

export { loginUser, signUp, userVerification };
