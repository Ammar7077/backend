import mongoose from "mongoose";

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
            item_due_date: Date,
          },
        ],
      },
      { timestamps: true },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
