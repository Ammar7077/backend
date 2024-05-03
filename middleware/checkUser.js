import mongoose from "mongoose";

const checkUser = async (req, res, next) => {
  const userId = req.params.id;

  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(404).json({ error: "User not found" });
    }

    if (req.user._id !== userId) {
      return res.status(404).json({ error: "You are not exist user" });
    } else {
      next();
    }
  } catch (error) {
    console.log("error with getting users:", error.message);
    res.status(500).json({ message: error.message });
  }
};

export default checkUser;
