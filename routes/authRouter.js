import express from "express";
const authRouter = express.Router();

import { register, login, refresh } from "../controllers/auth-controller.js";
import auth from "../middleware/auth.js";

// REGISTER
authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/refresh", auth, refresh);

export default authRouter;
