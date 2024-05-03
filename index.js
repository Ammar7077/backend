import express from "express";

import { configDotenv } from "dotenv";
configDotenv();

const app = express();
import corsMiddleware from "./config/corsConfig.js";

app.use(corsMiddleware);
app.use(express.json());
app.use(express.static("static"));

import authRouter from "./routes/authRouter.js";
import connectToDatabase from "./config/db-connettion.js";
import userRouter from "./routes/userRouter.js";
import sharedRouter from "./routes/sharedRouter.js";

app.use("/auth", authRouter);
app.use("/sharedTasks", sharedRouter);
app.use("/users", userRouter);

connectToDatabase();

const PORT = process.env.PORT || 3030;
app.listen(PORT, (error) =>
  error
    ? console.error(`\x1b[31mError:\x1b[0m ${error}`)
    : console.log(
        `\x1b[32mSERVER IS RUNNING ON THE \x1b[36m'http://localhost:${PORT}'\x1b[0m PORT`
      )
);
