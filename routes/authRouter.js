const authRouter = require("express").Router();
const { register, login, refresh } = require("../controllers/auth-controller");
const auth = require("../middleware/auth");

// REGISTER
authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/refresh", auth, refresh);

module.exports = authRouter;
