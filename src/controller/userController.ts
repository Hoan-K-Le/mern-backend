import { Response, Request } from "express";
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

    const secret = process.env.SECRET;
    if (!secret) {
      return;
    }
    const token = jwt.sign({ user: user._id }, secret, {
      expiresIn: "1d",
    });
    if (!token) {
      return res.status(401).json({ msg: "missing token." });
    }
    res.cookie("token", token);
    return res.status(200).json({ msg: "Successfully logged in.", user });
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
      return res.json({ msg: "Need email or password" });
    }
    const exist = await User.findOne({ email });
    if (exist) {
      return res.json({ msg: "Email already in use" });
    }

    const hash = await hashPassword(password);
    const user = await User.create({ email, password: hash });
    return res.status(200).json({ msg: "success", user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "failed to sign up." });
  }
};

// logout user
const logOut = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ msg: "Successfully logged out!" });
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
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

const createProfile = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    // When creating a profile we need name, gender, age, phone number, socials?, or profile image(save for end)
    const { name, gender, age, phoneNumber, userId } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          createdProfile: true,
          name,
          gender,
          age,
          contactNumber: phoneNumber,
        },
      },
      { new: true }
    );
    return res.status(200).json({ user: updatedUser });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server error" });
  }
};

export { loginUser, signUp, userVerification, logOut, createProfile };
