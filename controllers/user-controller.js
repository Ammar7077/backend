import mongoose from "mongoose";
import User from "../models/user.js";

const getUsers = async (req, res) => {
  try {
    await User.find().then((users) => res.status(200).json(users));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUser = async (req, res) => {
  const userId = req.params.id;

  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(404).json({ error: "User not found" });
    }

    if (req.user._id !== userId) {
      return res.status(404).json({ error: "You are not exist user" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTodos = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(404).json({ error: "User not found" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user.tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createTodo = async (req, res) => {
  const { name, description } = req.body;
  if (!name || !description) {
    return res.status(400).json({ error: "Invalid credentials" });
  }

  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.tasks.push({ name, description });
    await user.save();

    return res.status(201).json({ message: "Task created", user });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Task not created. Error: ${error.message}` });
  }
};
const createTodoItem = async (req, res) => {
  const todoId = req.params.id;
  const userId = req.query.userId;

  try {
    if (!mongoose.Types.ObjectId.isValid(todoId)) {
      return res.status(404).json({ error: "Todo not found" });
    }

    if (req.user._id.toString() !== userId) {
      return res.status(404).json({ error: "You are not an existing user" });
    }

    const { name, description, item_priority } = req.body;
    if (!name || !description || !item_priority) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const todo = user.tasks.find((todo) => todo._id.toString() === todoId);
    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    todo.items.push({
      name,
      description,
      item_priority,
      is_checked: false,
    });

    await user.save();

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

const deleteTodoItem = async (req, res) => {
  const todoId = req.params.id;
  const { userId, itemId } = req.query;

  try {
    if (!mongoose.Types.ObjectId.isValid(todoId)) {
      return res.status(404).json({ error: "Todo not found" });
    }
    if (req.user._id.toString() !== userId) {
      return res.status(404).json({ error: "You are not an existing user" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const todo = user.tasks.find((todo) => todo._id.toString() === todoId);
    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    const item = todo.items.find((item) => item._id.toString() === itemId);
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    todo.items.splice(todo.items.indexOf(item), 1);
    await user.save();

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

const updateTodo = async (req, res) => {
  const userId = req.query.userId;
  const taskId = req.params.id;
  const { name, description } = req.body;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(404).json({ error: "User not found" });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (req.user._id.toString() !== userId) {
      return res
        .status(403)
        .json({ error: "You are not authorized to update this task" });
    }

    const task = user.tasks.find((task) => task._id.toString() === taskId);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    if (name) {
      task.name = name;
    }
    if (description) {
      task.description = description;
    }

    await user.save();

    return res
      .status(200)
      .json({ message: "Task updated successfully", todos: user.tasks });
  } catch (error) {
    console.error("Error updating task:", error.message);
    return res.status(500).json({ error: "Failed to update task" });
  }
};

const updateTodoItem = async (req, res) => {
  const userId = req.query.userId;
  const todoId = req.params.id;
  const itemId = req.query.itemId;
  const { name, description, item_priority, is_checked, item_due_date } =
    req.body;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(404).json({ error: "User not found" });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (req.user._id.toString() !== userId) {
      return res
        .status(403)
        .json({ error: "You are not authorized to update this item" });
    }

    const todo = user.tasks.find((task) => task._id.toString() === todoId);
    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    const item = todo.items.find((item) => item._id.toString() === itemId);
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    if (name) {
      item.name = name;
    }
    if (description) {
      item.description = description;
    }
    if (item_priority) {
      item.item_priority = item_priority;
    }
    if (is_checked !== undefined) {
      item.is_checked = is_checked;
    }
    if (item_due_date) {
      item.item_due_date = item_due_date;
    }

    await user.save();

    return res
      .status(200)
      .json({ message: "Todo item updated successfully", tasks: user.tasks });
  } catch (error) {
    console.error("Error updating todo item:", error.message);
    return res.status(500).json({ error: "Failed to update todo item" });
  }
};

const deleteTodo = async (req, res) => {
  const userId = req.query.userId;
  const taskId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(404).json({ error: "User not found" });
  }

  if (req.user._id.toString() !== userId) {
    return res
      .status(403)
      .json({ error: "You are not authorized to delete this task" });
  }
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const taskIndex = user.tasks.findIndex(
      (task) => task._id.toString() === taskId
    );

    if (taskIndex === -1) {
      return res.status(404).json({ error: "Task not found" });
    }

    user.tasks.splice(taskIndex, 1);

    await user.save();

    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to delete task" });
  }
};

export {
  getUsers,
  getUser,
  createTodo,
  deleteTodo,
  getTodos,
  updateTodo,
  createTodoItem,
  deleteTodoItem,
  updateTodoItem,
};
