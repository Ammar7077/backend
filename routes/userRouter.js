const { Router } = require("express");
const {
  getUsers,
  updateUser,
  deleteUser,
  getUser,
  createTodo,
  deleteTodo,
  getTodos,
  updateTodo,
  createTodoItem,
  deleteTodoItem,
  updateTodoItem,
} = require("../controllers/user-controller");
const auth = require("../middleware/auth");
const checkRole = require("../middleware/checkRole");
const checkUser = require("../middleware/checkUser");
const userRouter = Router();

userRouter.get("/", getUsers);
userRouter.get("/:id", auth, checkUser, getUser);
userRouter.get("/todos/user/:id", auth, getTodos);

userRouter.post("/todos/user/:id", auth, checkUser, createTodo);
userRouter.post("/todos/:id", auth, createTodoItem);
userRouter.put("/todoItem/:id", auth, updateTodoItem);

userRouter.put("/todos/:id", auth, updateTodo);
userRouter.delete("/todos/:id", auth, deleteTodo);
userRouter.delete("/todoItem/:id", auth, deleteTodoItem);

module.exports = userRouter;
