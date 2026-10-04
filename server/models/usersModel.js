const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["Secretary", "Doctor"],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UsersSchema);