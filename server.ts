require("dotenv").config();
const express = require("express");

const app = express();

app.use("/", (req: any, res: any) => {
  res.json({ msg: "working" });
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on PORT: ${process.env.PORT}`);
});
