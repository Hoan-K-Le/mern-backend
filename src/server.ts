require("dotenv").config();
import userRoute from "./routes/user";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import workoutRoute from "./routes/workout";

const MONGO_URI = process.env.MONGO_URI || "";
const app = express();

mongoose
  .connect(MONGO_URI, { dbName: "test" })
  .then((): void => console.log("[SERVER]: Database is connected"))
  .catch((err: string): void =>
    console.log("[ERROR]: Database is not connected", err)
  );

const corsOptions = {
  origin: process.env.CLIENT_SIDE,
  credentials: true,
};

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use("/auth", userRoute);
app.use("/workout", workoutRoute);

app.listen(process.env.PORT, () => {
  console.log(`Listening on PORT: ${process.env.PORT}`);
});
