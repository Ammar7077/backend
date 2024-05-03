const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    username: String,
    email: { type: String, unique: true },
    password: String,
    role: String,
    tasks: [
      {
        name: String,
        description: String,
        is_shared: Boolean,
        items: [
          {
            name: String,
            description: String,
            item_priority: String,
            is_checked: Boolean,
          },
        ],
      },
      { timestamps: true },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
