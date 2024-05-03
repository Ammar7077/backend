const express = require("express");
const app = express();
require("dotenv").config();
const corsMiddleware = require("./config/corsConfig");

// ! ACCESS TO THE FRONTEND and EXPRESS JS THINGS
app.use(corsMiddleware);
app.use(express.json());
app.use(express.static("static"));

// ! ROUTES
const authRouter = require("./routes/authRouter");
const connectToDatabase = require("./config/db-connettion");
const userRouter = require("./routes/userRouter");

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.get("/", (req, res) => res.end("Response from server"));

// ! CONNETTING TO THE DATABASE
connectToDatabase();

// ! LISTENING SERVER
const PORT = process.env.PORT || 3030;
app.listen(PORT, (error) =>
  error
    ? console.error(`\x1b[31mError:\x1b[0m ${error}`)
    : console.log(
        `\x1b[32mSERVER IS RUNNING ON THE \x1b[36m'http://localhost:${PORT}'\x1b[0m PORT`
      )
);
