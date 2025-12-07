const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Имя обязательно"],
      minlength: [2, "Имя должно быть не менее 2 символов"],
    },
    surname: {
      type: String,
      required: [true, "Фамилия обязательна"],
      minlength: [2, "Фамилия должна быть не менее 2 символов"],
    },
    username: {
      type: String,
      required: [true, "Username обязателен"],
      minlength: [5, "Username должен быть не менее 5 символов"],
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user", userSchema);
