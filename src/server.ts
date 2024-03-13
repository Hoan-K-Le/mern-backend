require("dotenv").config();
import userRoute from "./routes/user";
import cors from "cors";
import express from "express";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/auth", userRoute);

app.listen(process.env.PORT, () => {
  console.log(`Listening on PORT: ${process.env.PORT}`);
});
