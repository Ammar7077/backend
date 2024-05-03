import { Router } from "express";
import {
  createTodo,
  createTodoItem,
  deleteTodo,
  deleteTodoItem,
  getTodos,
  getUser,
  getUsers,
  updateTodo,
  updateTodoItem,
} from "../controllers/user-controller.js";
import auth from "../middleware/auth.js";
import checkUser from "../middleware/checkUser.js";
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

export default userRouter;
